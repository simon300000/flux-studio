define([
    'react',
    'jquery',
    'jsx!widgets/Select',
    'jsx!widgets/List',
    'helpers/api/discover',
    'helpers/device-master',
    'helpers/i18n',
    'helpers/api/touch',
    'helpers/api/config',
    'app/constants/device-constants',
    'app/actions/alert-actions',
    'app/stores/alert-store',
    'app/actions/initialize-machine',
    'app/actions/progress-actions',
    'app/constants/progress-constants',
    'app/actions/input-lightbox-actions',
    'app/constants/input-lightbox-constants',
    'helpers/sprintf',
    'helpers/check-device-status',
    'helpers/device-list'
], function(
    React,
    $,
    SelectView,
    ListView,
    discover,
    DeviceMaster,
    i18n,
    touch,
    config,
    DeviceConstants,
    AlertActions,
    AlertStore,
    initializeMachine,
    ProgressActions,
    ProgressConstants,
    InputLightboxActions,
    InputLightboxConstants,
    sprintf,
    checkDeviceStatus,
    DeviceList
) {
    'use strict';

    var View = React.createClass({
        displayName: 'PrinterSelection',
        selected_printer: null,

        propTypes: {
            onClose: React.PropTypes.func,
            onGettingPrinter: React.PropTypes.func
        },

        getDefaultProps: function() {
            return {
                uniqleId: '',
                lang: i18n.get(),
                className: '',
                forceAuth: false,
                onGettingPrinter: function() {},
                onUnmount: function() {},
                onClose: function() {}
            };
        },

        getInitialState: function() {
            return {
                discoverId: 'printer-selector-' + (this.props.uniqleId || ''),
                printOptions: [],
                loadFinished: false,
                hadDefaultPrinter: true === initializeMachine.defaultPrinter.exist(),
                discoverMethods: {}
            };
        },

        componentDidMount: function() {
            var selectedPrinter = initializeMachine.defaultPrinter.get(),
                self = this,
                currentPrinter,
                lang = self.props.lang,
                _options = [],
                refreshOption = function(options) {
                    _options = [];

                    options.forEach(function(el) {
                        _options.push({
                            label: self._renderPrinterItem(el)
                        });

                        if (true === self.hadDefaultPrinter && el.uuid === selectedPrinter.uuid) {
                            // update device stat
                            initializeMachine.defaultPrinter.set({
                                name: el.name,
                                serial: el.serial,
                                uuid: el.uuid
                            });
                        }
                    });

                    self.setState({
                        printOptions: _options,
                        loadFinished: true
                    }, function() {
                        self._openAlertWithnoPrinters();
                    });
                };

            AlertStore.onCancel(self._onCancel);

            self.setState({
                discoverMethods: discover(
                    self.state.discoverId,
                    function(printers) {
                        printers = DeviceList(printers);
                        refreshOption(printers);
                    }
                )
            }, function() {
                var timer,
                    tryTimes = 20,
                    selectDefaultDevice = function() {
                        if (true === self.state.hadDefaultPrinter) {
                            if (null !== currentPrinter) {
                                self._selectPrinter(selectedPrinter);
                                clearInterval(timer);
                            }
                            else {
                                tryTimes--;
                            }
                        }

                        if (0 > tryTimes) {
                            clearInterval(timer);
                            if(self.state.printOptions.length === 0) {
                                AlertActions.showPopupError('device-not-found', lang.message.device_not_found.message, lang.message.device_not_found.caption);
                            }
                            else {
                                self.setState({
                                    loadFinished: false,
                                    hadDefaultPrinter: false
                                });
                            }
                        }
                    };

                currentPrinter = self.state.discoverMethods.getLatestPrinter(selectedPrinter);

                timer = setInterval(selectDefaultDevice, 100);
            });

            self._waitForPrinters();
        },

        componentWillUnmount: function() {
            if ('function' === typeof this.state.discoverMethods.removeListener) {
                this.state.discoverMethods.removeListener(this.state.discoverId);
            }

            AlertStore.removeCancelListener(this._onCancel);
            if(this.props.onUnmount) {
                this.props.onUnmount();
            }
        },

        _onCancel: function(id) {
            switch (id) {
            case 'no-printer':
            case 'printer-connection-timeout':
                this._handleClose();
                break;
            default:
                break;
            }
        },

        _selectPrinter: function(printer, e) {
            var self = this,
                lang = self.props.lang,
                onError = function() {
                    ProgressActions.close();
                    if(self.selected_printer.plaintext_password){
                        //Skip if user entered password for the first time.
                        self._returnSelectedPrinter();
                    }else{
                        InputLightboxActions.open('auth-device', {
                            type         : InputLightboxConstants.TYPE_PASSWORD,
                            caption      : sprintf(lang.select_printer.notification, printer.name),
                            inputHeader  : lang.select_printer.please_enter_password,
                            confirmText  : lang.select_printer.submit,
                            onSubmit     : function(password) {
                                printer.plaintext_password = password;
                                ProgressActions.open(ProgressConstants.NONSTOP);

                                self._auth(printer.uuid, password, {
                                    onError: function(response) {
                                        var message = (
                                            false === response.reachable ?
                                            lang.select_printer.unable_to_connect :
                                            lang.select_printer.auth_failure
                                        );

                                        ProgressActions.close();

                                        AlertActions.showPopupError('device-auth-fail', message);
                                    }
                                });
                            }
                        });
                    }
                    
                };

            self.selected_printer = printer;

            if ('00000000000000000000000000000000' === self.selected_printer.uuid) {
                self._returnSelectedPrinter();
            }
            else {
                ProgressActions.open(ProgressConstants.NONSTOP_WITH_MESSAGE, lang.initialize.connecting);

                DeviceMaster.selectDevice(self.selected_printer).done(function(status) {
                    if (status === DeviceConstants.CONNECTED) {
                        printer = self.state.discoverMethods.getLatestPrinter(printer);
                        checkDeviceStatus(printer).done(function(status) {
                            if (true === self.props.forceAuth && true === printer.password) {
                                onError();
                                return;
                            }

                            self._returnSelectedPrinter();
                        });
                    }
                    else if (status === DeviceConstants.TIMEOUT) {
                        // TODO: Check default printer
                        if (self.state.hadDefaultPrinter) {
                            AlertActions.showPopupError(
                                'printer-connection-timeout',
                                sprintf(lang.message.device_not_found.message, self.selected_printer.name),
                                lang.message.device_not_found.caption
                            );
                        }
                        else{
                            AlertActions.showPopupError('printer-connection-timeout', lang.message.connectionTimeout, lang.caption.connectionTimeout);
                        }
                    }
                }).
                always(() => {
                    ProgressActions.close();
                }).
                fail(function(status) {
                    AlertActions.showPopupError('fatal-occurred', status);
                });
            }
        },

        _auth: function(uuid, password, opts) {
            var lang = this.props.lang;
            ProgressActions.open(ProgressConstants.NONSTOP_WITH_MESSAGE, lang.initialize.connecting);
            opts = opts || {};
            opts.onError = opts.onError || function() {};

            var self = this,
                _opts = {
                    onSuccess: function(data) {
                        ProgressActions.close();
                        self._returnSelectedPrinter();
                    },
                    onFail: function(data) {
                        ProgressActions.close();
                        opts.onError(data);
                    },
                    checkPassword: self.props.forceAuth
                },
                touch_socket;

            touch_socket = touch(_opts).send(uuid, password);
        },

        _handleClose: function(e) {
            this.props.onClose();
        },

        // renders
        _renderPrinterSelection: function(lang) {
            var self = this,
                printOptions = self.state.printOptions,
                options = (0 < printOptions.length ? printOptions : [{
                    label: (
                        <div className="spinner-roller spinner-roller-reverse"/>
                    )
                }]),
                content = (
                    <div className="device-wrapper">
                        <ListView className="printer-list" items={options}/>
                    </div>
                );

            return content;
        },

        _returnSelectedPrinter: function() {
            var self = this;

            self.props.onGettingPrinter(self.selected_printer);
        },

        _renderPrinterItem: function(printer) {
            var meta,
                lang = this.props.lang,
                status = lang.machine_status,
                headModule = lang.head_module,
                statusText = status[printer.st_id] || status.UNKNOWN,
                headText = headModule[printer.head_module] || headModule.UNKNOWN;

            if (DeviceConstants.status.RUNNING === printer.st_id && 'number' === typeof printer.st_prog) {
                statusText += ' - ' + (parseInt(printer.st_prog * 1000) * 0.1).toFixed(1) + '%';
            }

            try {
                meta = JSON.stringify(printer);
            }
            catch (ex) {
                console.log(ex, printer);
            }

            return (
                <div className="device printer-item" data-meta={meta} onClick={this._selectPrinter.bind(null, printer)}>
                    <div className="col device-name">{printer.name}</div>
                    <div className="col module">{headText}</div>
                    <div className="col status">{statusText}</div>
                </div>
            );
        },

        render: function() {
            var self = this,
                lang = self.props.lang,
                showPassword = self.state.showPassword,
                cx = React.addons.classSet,
                wrapperClass = ['select-printer'],
                content = self._renderPrinterSelection(lang),
                hadDefaultPrinter = self.state.hadDefaultPrinter;

            if ('string' === typeof self.props.className) {
                wrapperClass.push(self.props.className);
            }

            wrapperClass = cx.apply(null, wrapperClass);

            return (
                true === hadDefaultPrinter ?
                <span/> :
                <div className={wrapperClass}>
                    {content}
                    <div className="arrow arrow-right"/>
                </div>
            );
        },

        _waitForPrinters: function() {
            setTimeout(this._openAlertWithnoPrinters, 5000);
        },

        _openAlertWithnoPrinters: function() {
            var self = this,
                lang = self.props.lang;

            AlertStore.removeRetryListener(self._waitForPrinters);

            if (0 === self.state.printOptions.length && false === self.state.hadDefaultPrinter) {
                AlertActions.showPopupRetry('no-printer', lang.device_selection.no_printers);
                AlertStore.onRetry(self._waitForPrinters);
            }
        }
    });

    return View;
});
