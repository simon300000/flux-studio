define([
    'jquery',
    'react',
    'app/actions/perspective-camera',
    'jsx!widgets/Button-Group',
    'app/actions/alert-actions',
    'app/stores/alert-store'
], function($, React, PerspectiveCamera, ButtonGroup, AlertActions, AlertStore) {
    'use strict';

    return React.createClass({
        propTypes: {
            lang                    : React.PropTypes.object,
            hasObject               : React.PropTypes.bool,
            hasOutOfBoundsObject    : React.PropTypes.bool,
            onPreviewClick          : React.PropTypes.func,
            onDownloadGCode         : React.PropTypes.func,
            onDownloadFCode         : React.PropTypes.func,
            onGoClick               : React.PropTypes.func,
            onCameraPositionChange  : React.PropTypes.func,
        },

        getInitialState: function() {
            return {
                previewOn: false
            };
        },

        componentDidMount: function() {
            PerspectiveCamera.init(this);
        },

        componentWillReceiveProps: function(nextProps) {
            if(nextProps.updateCamera === true) {
                PerspectiveCamera.setCameraPosition(nextProps.camera);
            }
        },

        _handleTest: function() {
            AlertActions.showInfo('hello');
            AlertActions.showWarning('warning');
            AlertActions.showError('error');
        },

        _handleRetry: function(id) {
            console.log('sending retry with ID:' + id);
        },

        _handleAnswer: function(id, isYes) {
            console.log(id, isYes);
        },

        _handleGeneric: function(id, message) {
            console.log(id, message);
        },

        _handleGetFCode: function() {
            this.props.onDownloadFCode();
        },

        _handleGo: function(e) {
            e.preventDefault();
            this.props.onGoClick();
        },

        _handleGetGCode: function() {
            this.props.onDownloadGCode();
        },

        _updateCamera: function(position, rotation) {
            this.props.onCameraPositionChange(position, rotation);
        },

        _renderActionButtons: function(lang) {
            var cx = React.addons.classSet,
                buttons = [{
                    label: lang.laser.get_fcode,
                    className: cx({
                        'btn-disabled': !this.props.hasObject || this.props.hasOutOfBoundsObject,
                        'btn-default': true,
                        'btn-hexagon': true,
                        'btn-get-fcode': true
                    }),
                    title: lang.print.getFcodeTitle,
                    dataAttrs: {
                        'ga-event': 'get-print-fcode'
                    },
                    onClick: this._handleGetFCode
                }, {
                    label: lang.monitor.start,
                    className: cx({
                        'btn-disabled': !this.props.hasObject || this.props.hasOutOfBoundsObject,
                        'btn-default': true,
                        'btn-hexagon': true,
                        'btn-go': true
                    }),
                    title: lang.print.goTitle,
                    dataAttrs: {
                        'ga-event': 'print-goto-monitor'
                    },
                    onClick: this._handleGo
                }];

            return (
                <ButtonGroup buttons={buttons} className="beehive-buttons action-buttons"/>
            );
        },

        render: function() {
            var lang            = this.props.lang,
                actionButtons   = this._renderActionButtons(lang);

            return (
                <div className='rightPanel'>
                    <div id="cameraViewController" className="cameraViewController"></div>
                    {actionButtons}
                </div>
            );
        }
    });
});
