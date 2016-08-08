/**
 * Point cloud helper
 */
define(function() {
    'use strict';

    // use "NEW" operator to create object
    return function() {
        var blobs = [],
            chunk = {
                left: [],
                right: []
            };

        return {
            push: function(data, leftLen, rightLen) {

                if (true === data instanceof Blob) {
                    blobs.push(data);

                    chunk.right.push(data.slice(0, leftLen));
                    chunk.left.push(data.slice(leftLen, leftLen + rightLen));
                }
                else {
                    // TODO: throw exception?
                }

                return this;
            },
            get: function() {
                return {
                    left: new Blob(chunk.left),
                    right: new Blob(chunk.right),
                    total: new Blob(chunk.left.concat(chunk.right))
                };
            }
        };
    };
});