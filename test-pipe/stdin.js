process.stdin.resume();
process.stdin.setEncoding('utf8');

const padLeft = function(str, len) {
    var totalStr = (new Array(len + 1 - str.length)).join('0') + str;

    // return totalStr.slice(totalStr.length - len);
    return totalStr;
};

process.stdin.on('data', function(chunk) {
    var data = JSON.stringify({
        timestamp: (new Date).toString(),
        from: 'the other side',
        youre: chunk.toString()
    });
    // console.log('`' + chunk.toString() + '` from the other side [' + (new Date).toString() + ']');
    // console.log(chunk.toString());
    // process.stdout.write('t' + padLeft(chunk.toString().length, 7) + chunk.toString());
    console.log('t' + padLeft(data.length.toString(16), 7) + data);
});
