define([
    'react',
    'jsx!widgets/Radio-Group'
], function(React, RadioGroupView) {
    'use strict';

    return React.createClass({

        getDefaultProps: function() {
            return {
                lang: {},
                onExport: function() {}
            };
        },

        _onExport: function(e) {
            this.props.onExport(e);
        },

        render : function() {
            var lang = this.props.lang;

            return (
                <div className="scan-model-save-as absolute-center">
                    <h4 className="caption">{lang.scan.save_as}</h4>
                    <RadioGroupView className="file-formats clearfix" name="file-format" options={lang.scan.save_mode}/>
                    <div>
                        <button data-ga-event="scan-export-to-file" className="btn btn-default" onClick={this._onExport}>{lang.scan.do_save}</button>
                    </div>
                </div>
            );
        }
    });
});