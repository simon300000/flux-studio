define([
    'jquery',
    'react',
    'helpers/i18n',
    'helpers/device-master',
    'helpers/device-list',
    'helpers/pad-string',
    'plugins/classnames/index',
], function(
    $,
    React,
    i18n,
    DeviceMaster,
    DeviceList,
    PadString,
    ClassNames
) {
    'use strict';

    return React.createClass({

        lang: {},

        getInitialState: function() {
            return {
                selectedDevice: {},
                bindingInProgress: false
            };
        },

        componentWillMount: function() {
            this.lang = i18n.get();
        },

        componentDidMount: function() {
            let getList = () => {
                let deviceList = DeviceList(DeviceMaster.getDeviceList());
                this.setState({ deviceList });
            }
            getList();
            
            setInterval(() => {
                getList();
            }, 2000);
        },

        _handleSelectDevice: function(device) {
            console.log(device);
            this.setState({ selectedDevice: device});
        },

        _handleCancel: function() {
            location.hash = '#/studio/print';
        },

        _handleCancelBinding: function() {
            this.setState({ bindingInProgress: false });
        },

        _handleBind: function() {
            this.setState({ bindingInProgress: true });
            setTimeout(() => {
                this.setState({ bindingInProgress: false });
                location.hash = '#studio/cloud/bind-success';
            }, 2000);
            // location.hash = '#/studio/cloud/forgot-password';
        },

        _renderBindingWindow: function() {
            let lang = this.props.lang.settings.flux_cloud,
                bindingWindow;

            bindingWindow = (
                <div className="binding-window">
                    <h1>{lang.binding}</h1>
                    <div className="spinner-roller absolute-center"></div>
                    <div className="footer">
                        <a onClick={this._handleCancelBinding}>{lang.cancel}</a>
                    </div>
                </div>
            )

            return this.state.bindingInProgress ? bindingWindow : '';
        },

        _renderBlind: function() {
            let blind = (
                <div className="blind"></div>
            );

            return this.state.bindingInProgress ? blind : '';
        },

        render: function() {
            let lang = this.props.lang.settings.flux_cloud,
                deviceList,
                bindingWindow,
                blind;

            bindingWindow = this._renderBindingWindow();
            blind = this._renderBlind();

            if(!this.state.deviceList) {
                deviceList = <div>{this.lang.device.please_wait}</div>;
            }
            else {
                deviceList = this.state.deviceList.map((d) => {
                    let c = ClassNames(
                        'device',
                        {'selected': this.state.selectedDevice.name === d.name}
                    );

                    return (
                        <div className={c} onClick={this._handleSelectDevice.bind(null, d)}>
                            <div className="name">{d.name}</div>
                            <div className="status">{this.lang.machine_status[d.st_id]}</div>
                        </div>
                    );
                });
            }

            return(
                <div className="cloud">
                    <div className="container bind-machine">
                        <div className="title">
                            <h3>{lang.select_to_bind}</h3>
                        </div>
                        <div className="controls">
                            <div className="select">
                                {deviceList}
                                {/* <select size="8">
                                    {deviceList}
                                </select> */}
                            </div>
                            <div className="user-info">
                                <div className="name">Ryoko Hirosue</div>
                                <div className="email">ryoko@gmail.com</div>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="divider">
                            <hr />
                        </div>
                        <div className="actions">
                            <button className="btn btn-cancel" onClick={this._handleCancel}>{lang.cancel}</button>
                            <button className="btn btn-default" onClick={this._handleBind}>{lang.bind}</button>
                        </div>
                    </div>
                    {bindingWindow}
                    {blind}
                </div>
            );
        }

    });

});
