'use strict';

var fluxAPI = function(method, opts) {
    opts = opts || {};

    // private,
    const padLeft = function(str, len) {
        var totalStr = (new Array(len + 1 - str.length)).join('0') + str;

        return totalStr;
    };

    var body = new Buffer(0),
        responseBody,
        bodyType = '',
        bodyLength = 0,
        childProcess;

    // events
    this.onopen = () => {};
    this.onclose = () => {};
    this.onmessage = () => {};

    // constructor
    ((method, opts) => {
        const spawn = require('child_process').spawn,
            HEADER_LENGTH = 8,
            apiMap = {
                'discover': ['python', ['pipe_proto.py']],
                'stdin': ['node', ['stdin.js']]
            },
            command = apiMap[method];

        this.onopen = opts.onopen || function() {};
        this.onclose = opts.onclose || function() {};
        this.onmessage = opts.onmessage || function() {};

        childProcess = spawn(command[0], command[1]);

        childProcess.stdout.on('data', (data) => {
            body = Buffer.concat([body, data], data.length + body.length);

            if (HEADER_LENGTH <= body.length) {
                bodyType = body.slice(0, 1).toString();
                bodyLength = parseInt(body.slice(1, HEADER_LENGTH).toString(), 16);
            }
            else {
                // reset
                bodyType = '';
                bodyLength = 0;
            }

            if ('' !== bodyType &&
                0 < bodyLength &&
                body.length >= HEADER_LENGTH + bodyLength
            ) {
                responseBody = body.slice(HEADER_LENGTH, bodyLength + HEADER_LENGTH);

                this.onmessage(responseBody, ('t' === bodyType ? 'TEXT' : 'BINARY'));
                // handle body
                body = body.slice(bodyLength + HEADER_LENGTH);
            }
        });

        childProcess.on('close', (code) => {
            // 0 is Abnormal close
            // 1 is Uncaught Fatal Exception
            this.onclose(code);
            console.log('close', code);
        });

        childProcess.on('error', (err) => {
            console.log('err', err);
        });
    })(method, opts);

    this.send = (data) => {
        var dataType = ('string' === typeof data ? 't' : 'b'),
            dataLength = padLeft(data.length.toString(16), 7);

        // send header
        childProcess.stdin.write(dataType + dataLength);
        // send body
        childProcess.stdin.write(data);
    };

    this.kill = () => {
        childProcess.kill();
    }
}

new fluxAPI('discover', {
    onmessage: (response, type) => {
        console.log('\n' + response);
    }
});

function pickUpThePhone() {
    const readline = require('readline');
    const api = new fluxAPI('stdin', {
        onmessage: (response, type) => {
            console.log('\n' + type);
            pickUpThePhone();
        }
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Hello? ', (answer) => {
        api.send(answer);

        rl.close();
    });
};

pickUpThePhone();
