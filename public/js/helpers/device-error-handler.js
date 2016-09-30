define(['helpers/i18n'], function (i18n) {
    'use strict';

    const lang = i18n.get();

    const self = {
        /**
        * Translate device error into readable language
        * @param {String|String[]} error - some string or array
        */
        translate: (error) => {
            // always process error as array, hard fix for the backend
            error = (error instanceof Array ? error : [error]);

            let errorOutput = '';

            if (error.length) {
                if (error.length == 3) {
                    errorOutput = self.processErrorCode(error[2]);
                    // for wrong toolhead type;
                    if (error[1] === 'TYPE_ERROR') {
                        error.slice()
                        errorOutput = lang.monitor[error.slice(0, 2).join('_')];
                    }
                    if (errorOutput === '') {
                        errorOutput = (error.length >= 2) ? lang.monitor[error.slice(0, 2).join('_')] : error.join('_');
                    }
                } else {
                    if (lang.error[error[0]]){
                        return lang.error[error[0]];
                    }
                    errorOutput = lang.monitor[error.slice(0, 2).join('_')];
                    if (errorOutput === '' || typeof errorOutput === 'undefined') {
                        errorOutput = error.join(' ');
                    }
                }
            }

            return errorOutput || '';
        },
        /**
         *  Process error code ( mostly for toolhead error )
         *  @param {String} argument - The error code 
         */
        processErrorCode: (argument) => {
            if (Number(errorCode) === parseInt(errorCode)) {
                let m = parseInt(errorCode).toString(2).split('').reverse();
                let message = m.map((flag, index) => {
                    return flag === '1' ? lang.head_module.error[index] : '';
                });
                return message.filter(entry => entry !== '').join('\n');
            } else {
                return '';
            }
        }
    };
    return self;
});