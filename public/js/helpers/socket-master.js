define([
    'jquery'
], (
    $
) => {

    let _tasks = [],
        _task,
        _ws;

    const setWebSocket = (ws) => {
        _ws = ws;
    };

    const addTask = (command, ...args) => {
        // console.log('add task', command, ...args);
        let d = $.Deferred();
        _tasks.push({d, command, args});

        if(!_task) {
            doTask();
        }

        return d.promise();
    };

    const doTask = () => {
        _task = _tasks.shift();
        // console.log('doing task', _task);

        _ws[_task.command](..._task.args).then((result) => {
            _task.d.resolve(result);
            doNext();
        }).progress((result) => {
            _task.d.notify(result);
        }).fail((result) => {
            _task.d.reject(result);
            doNext();
        });
    };

    const doNext = () => {
        // console.log('task count: ' + _tasks.length);
        _tasks.length > 0 ? doTask() : _task = null;
    };

    const nextTask = () => ( _tasks.length > 0 ? _tasks[0] : null);

    return {
        setWebSocket,
        addTask,
        doTask,
        nextTask
    };

});
