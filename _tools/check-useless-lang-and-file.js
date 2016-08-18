// global variables
var requirejs = require("requirejs");
var exec = require('child_process').exec;

requirejs.config({
    baseUrl: '.',
    nodeRequire: require
});

var allKeys = [];

var bindingKeys = function(root, parentKey) {
    const keys = Object.keys(root);

    keys.forEach(function(key) {
        if ('string' === typeof root[key]) {
            if ('string' === typeof parentKey) {
                key = `[${parentKey}\\.]\\{0,\\}${key}`;
            }

            allKeys.push(key);
        }

        if (root[key] instanceof Object && false === root[key] instanceof Array) {
            bindingKeys(root[key], key);
        }
    });
}

requirejs(['public/js/app/lang/en', 'public/js/app/lang/zh-tw'], function(en, zh) {
    var keys = Object.keys(en);

    bindingKeys(en);
    allKeys.forEach(function(key) {
        exec(`grep -r -e '\\.${key}' ./public/js --include=*.{js,jsx} --exclude=*js\/lib*|wc -l`, {}, function(err, stdout, stderr) {
            if (0 === parseInt(stdout, 10)) {
                console.log(`\`${key}\` is no longer used`);
            }
        });
    });
});

// searching the file is no longer used
exec(`find ./public/js -type f -follow -print|grep '\\.js[x]\\{1,\\}$'|xargs ls -l`, {}, function(err, stdout, stderr) {
    var list = stdout.split('\n');

    list = list.map(function(file) {
        return file.replace(/.*\/((\w|-)+)\.(js|jsx)$/g, '$1');
    });

    list.forEach(function(key) {
        exec(`grep -r -e "${key}'" ./public/js --include=*.{js,jsx} --exclude=*js\/lib*|wc -l`, {}, function(err, stdout, stderr) {
            if (0 === parseInt(stdout, 10)) {
                console.log(`File \`${key}\` is no longer used`);
            }
        });
    });
});