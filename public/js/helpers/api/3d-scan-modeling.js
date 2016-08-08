/**
 * API 3d scan modeling
 * Ref: https://github.com/flux3dp/fluxghost/wiki/websocket-3dscan-modeling
 */
define([
    'jquery',
    'helpers/websocket',
    'helpers/point-cloud',
    'helpers/data-history'
], function($, Websocket, PointCloudHelper, history) {
    'use strict';

    return function(opts) {
        opts = opts || {};
        opts.onError = opts.onError || function() {};
        opts.onFatal = opts.onFatal || function() {};
        opts.onClose = opts.onClose || function() {};

        var ws,
            events = {
                onMessage: function() {}
            },
            History = history(),
            splitBinary = function(blob, callback) {
                callback = callback || function() {};

                var chunk,
                    CHUNK_PKG_SIZE = 4096,
                    onLoaded = function(e) {
                        callback(this.result);
                    };

                // split up to pieces
                for (var i = 0; i < blob.size; i += CHUNK_PKG_SIZE) {
                    chunk = blob.slice(i, i + CHUNK_PKG_SIZE);
                    callback(chunk);
                }
            };

        ws = new Websocket({
            method: '3d-scan-modeling',
            onMessage: function(data) {

                events.onMessage(data);

            }
        });
        ws.onError(opts.onError).onFatal(opts.onFatal).onClose(opts.onClose);

        return {
            connection: ws,
            History: History,
            upload: function(name, point_cloud) {
                var $deferred = $.Deferred(),
                    order_name = 'upload',
                    args = [
                        order_name,
                        name,
                        point_cloud.left.size / 24,
                        point_cloud.right.size / 24 || 0
                    ];

                if (24 > point_cloud.left.size + point_cloud.right.size) {
                    return $deferred.reject().promise();
                }

                events.onMessage = function(data) {
                    switch (data.status) {
                    case 'continue':
                        ws.send(point_cloud.total);

                        break;
                    case 'ok':
                        History.push(name, point_cloud.total);
                        $deferred.resolve();
                        break;
                    }

                };

                ws.send(args.join(' '));

                return $deferred.promise();
            },
            /**
             * @param {String} in_name  - source name
             * @param {String} out_name - target name
             * @param {Array}  args     - where to cut
             *      [
             *          { <mode>, <direction>, <value> }, ...
             *      ]
             * @param {Function} onReceiving - event progress
             */
            cut: function(in_name, out_name, args, onReceiving) {
                var self = this,
                    $deferred = $.Deferred(),
                    order_name = 'cut',
                    next_arg,
                    _args = [];

                events.onMessage = function(response) {

                    switch (response.status) {
                    case 'ok':
                        $deferred.notify();
                        break;
                    default:
                        $deferred.reject();
                    }

                };

                $deferred.progress(() => {
                    next_arg = args.pop();

                    if ('undefined' !== typeof next_arg) {
                        _args = [
                            order_name,
                            in_name,
                            out_name,
                            next_arg.mode,
                            next_arg.direction,
                            next_arg.value
                        ];

                        ws.send(_args.join(' '));
                        in_name = out_name;
                    }
                    else {
                        self.dump(
                            out_name,
                            onReceiving
                        ).done((pointCloud) => {
                            $deferred.resolve(pointCloud);
                        });
                    }
                }, 0);

                return $deferred.notify().promise();
            },
            deleteNoise: function(in_name, out_name, c) {
                var self = this,
                    $deferred = $.Deferred(),
                    order_name = 'delete_noise',
                    args = [
                        order_name,
                        in_name,
                        out_name,
                        c = ('number' === typeof c ? c : 0.3)   // default by 0.3
                    ];

                events.onMessage = function(response) {

                    switch (response.status) {
                    case 'ok':
                        $deferred.resolve({
                            outName: out_name
                        });
                        // self.dump(
                        //     out_name,
                        //     onReceiving
                        // ).done((pointCloud) => {
                        //     $deferred.resolve(onReceiving);
                        // });
                        break;
                    default:
                        $deferred.reject(response);
                    }

                };

                ws.send(args.join(' '));

                return $deferred.promise();
            },
            autoMerge: function(base, target, output, onReceiving) {
                var self = this,
                    $deferred = $.Deferred(),
                    order_name = 'auto_merge',
                    args = [
                        order_name,
                        base,
                        target,
                        output
                    ];

                events.onMessage = function(response) {

                    switch (response.status) {
                    case 'ok':
                        self.dump(
                            output,
                            onReceiving
                        ).done((pointCloud) => {
                            $deferred.resolve(onReceiving);
                        });
                        break;
                    default:
                        $deferred.reject(response);
                        break;
                    }

                };

                ws.send(args.join(' '));

                return $deferred.promise();
            },

            merge: function(base, target, output) {
                var self = this,
                    $deferred = $.Deferred(),
                    order_name = 'merge',
                    args = [
                        order_name,
                        base,
                        target,
                        output
                    ];

                events.onMessage = function(response) {
                    switch (response.status) {
                    case 'ok':
                        $deferred.resolve(response);
                        break;
                    default:
                        $deferred.reject(response);
                    }
                };

                ws.send(args.join(' '));

                return $deferred.promise();
            },
            /**
             * @param {String}   name        - source name
             * @param {Function} onReceiving - event onReceiving
             * @param {String}   side        - which side that dump
             *
             * @return {Promise}
             */
            dump: function(name, onReceiving, side) {
                onReceiving = onReceiving || function() {};
                side = side || 'both';

                var order_name = 'dump',
                    $deferred = $.Deferred(),
                    args = [
                        order_name,
                        name
                    ],
                    pointCloud = new PointCloudHelper(),
                    next_left = 0,
                    next_right = 0,
                    _opts = {
                        onProgress: onReceiving
                    };

                events.onMessage = function(data) {

                    if (true === data instanceof Blob) {
                        pointCloud.push(data, next_left, next_right, _opts);
                    }
                    else if ('continue' === data.status) {
                        next_left = parseInt(data.left, 10) * 24;
                        next_right = parseInt(data.right, 10) * 24;

                        switch (side) {
                        case 'left':
                            next_left = next_left + next_right;
                            break;
                        case 'right':
                            next_right = next_left + next_right;
                            break;
                        }
                    }
                    else if ('ok' === data.status) {
                        History.push(name, pointCloud);
                        $deferred.resolve(pointCloud.get());
                    }

                };

                ws.send(args.join(' '));

                return $deferred.promise();
            },
            /**
             * @param {String} name        - source name
             * @param {String} file_format - file format (stl, pcd)
             * @param {Json}   opts        - option parameters
             *      {
             *          onFinished <export finished>
             *      }
             */
            export: function(name, file_format, opts) {
                opts.onFinished = opts.onFinished || function() {};

                var order_name = 'export',
                    args = [
                        order_name,
                        name,
                        file_format
                    ],
                    blobs = [];

                events.onMessage = function(data) {

                    if (true === data instanceof Blob) {
                        blobs.push(data);
                    }
                    else if ('string' === typeof data.status && 'continue' === data.status) {
                        // TODO: do something?
                    }
                    else if ('string' === typeof data.status && 'ok' === data.status) {
                        opts.onFinished(new Blob(blobs));
                    }

                };

                ws.send(args.join(' '));
            },
            /**
             * apply changes for 3d object
             *
             * @param {String}   baseName   - source name
             * @param {String}   outName    - output name
             * @param {Json}     params     - the parameters that apply for
             *
             * @return {Promise}
             */
            applyTransform: function(baseName, outName, params) {
                var args = [
                    'apply_transform',
                    baseName,
                    params.pX || 0,
                    params.pY || 0,
                    params.pZ || 0,
                    params.rX || 0,
                    params.rY || 0,
                    params.rZ || 0,
                    outName
                ],
                $deferred = $.Deferred(),
                doTransform = function() {
                    events.onMessage = function(response) {

                        if ('ok' === response.status) {
                            $deferred.resolve(response);
                        }
                        else {
                            $deferred.reject(response);
                        }

                    };

                    ws.send(args.join(' '));
                };

                doTransform();

                return $deferred.promise();
            },
            /**
             * import pcd file
             *
             * @param {String}   name       - source name
             * @param {String}   fileType   - file type (only support pcd)
             * @param {Blob}     file       - binary
             * @param {Integer}  fileLength - file length
             *
             */
            import: function(name, fileType, file, fileLength) {
                var self = this,
                    $deferred = $.Deferred(),
                    args = [
                        'import_file',
                        name,
                        fileType,
                        fileLength
                    ];

                events.onMessage = function(data) {

                    switch (data.status) {
                    case 'ok':
                        self.dump(name).done((pointCloud) => {
                            $deferred.resolve(pointCloud);
                        });
                        break;
                    case 'continue':
                        splitBinary(file, function(result) {
                            ws.send(result);
                        });
                        break;
                    default:
                        $deferred.reject(data);
                    }

                };

                ws.send(args.join(' '));

                return $deferred.promise();
            },
            /**
             * export threading (running in background)
             *
             * @param {String} name     - source name
             * @param {String} fileType - file type (stl, pcd)
             *
             * @return {Promise}
             */
            export_threading: function(name, fileType) {
                var self = this,
                    $deferred = $.Deferred(),
                    args = [
                        'export_threading',
                        name,
                        fileType
                    ];

                events.onMessage = function(data) {

                    switch (data.status) {
                    case 'ok':
                        $deferred.resolve(data);
                        break;
                    default:
                        $deferred.reject(data);
                    }

                };

                ws.send(args.join(' '));

                return $deferred.promise();
            },
            /**
             * export collect (running in background)
             *
             * @param {String} name - source name
             *
             * @return {Promise}
             */
            export_collect: function(name) {
                var self = this,
                    $deferred = $.Deferred(),
                    args = [
                        'export_collect',
                        name
                    ],
                    length = 0;

                events.onMessage = function(data) {
                    if (true === data instanceof Blob) {
                        $deferred.notify({ status: 'binary', data: new Blob([data]) });
                    }
                    else {
                        switch (data.status) {
                        case 'computing':
                        case 'continue':
                            length = data.length || 0;
                            $deferred.notify(data);
                            break;
                        case 'ok':
                            $deferred.resolve(data);
                            break;
                        default:
                            $deferred.reject(data);
                        }
                    }

                };

                ws.send(args.join(' '));

                return $deferred.promise();
            },
            /**
             * take sub set from specific point cloud
             *
             * @param {String} baseName - base name
             * @param {String} outName  - out name
             * @param {String} side     - side (left, right, both)
             *
             * @return {Promise}
             */
            subset: function(baseName, outName, side) {
                var sideMap = ['left', 'right', 'both'],    // `both` means - duplicate a new point cloud
                    $deferred = $.Deferred(),
                    args = [
                        'subset',
                        baseName,
                        outName,
                        side
                    ];

                if (-1 === sideMap.indexOf(side)) {
                    // reject directly
                    return $deferred.reject({ status: 'error', reason: 'Wrong Side' }).promise();
                }

                events.onMessage = function(data) {
                    switch (data.status) {
                    case 'ok':
                        $deferred.resolve(data);
                        break;
                    default:
                        $deferred.reject(data);
                    }
                };

                ws.send(args.join(' '));

                return $deferred.promise();
            }
        };
    };
});