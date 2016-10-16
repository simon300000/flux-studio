define(function() {
    'use strict';

    return {
        support: {
            no_webgl: '您的系统不支持 WebGL，建议您使用其他电脑开启 FLUX Studio',
            no_vcredist: '请安装 Visual C++ Redistributable 2015',
            osx_10_9: 'FLUX Studio 目前不支持 OS X 10.9，请升级至更新的版本。'
        },
        device_selection: {
            no_printers: '无法通过 Wi-Fi 搜索到 FLUX Delta，请检查您与机器的网络连接是否在同一个局域网 <a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/215394548">详细信息</a>',
            module: 'MODULE',
            status: 'STATUS'
        },
        update: {
            release_note: '版本信息:',
            firmware: {
                caption: 'FLUX Delta 有新的软件更新',
                message_pattern_1: '"%s" 有新的软件更新。',
                message_pattern_2: 'FLUX 软件 v%s 可使用 - 你的版本为 v%s.',
                latest_firmware: {
                    caption: '软件更新',
                    message: '软件已经是最新版本'
                },
                confirm: '上传',
                upload_file: '软件上传',
                update_success: '软件更新上传成功',
                update_fail: '更新失败'
            },
            software: {
                caption: 'FLUX Studio 有新的软件更新',
                message_pattern_1: 'FLUX Studio 有新的软件更新。',
                message_pattern_2: 'FLUX Software v%s 可使用 - 你的版本为 v%s.'
            },
            toolhead: {
                caption: 'FLUX 工具头有新的软件更新',
                message_pattern_1: '"%s" 有新的软件更新。',
                message_pattern_2: 'FLUX Toolhead Firmware v%s 可使用',
                latest_firmware: {
                    caption: '软件更新',
                    message: '软件已经是最新版本'
                },
                confirm: '上传',
                upload_file: '软件上传',
                update_success: '软件更新上传成功',
                update_fail: '更新失败',
                waiting: '请确认已安装工具头'
            },
            updating: '更新中...',
            skip: '跳过此版本',
            later: '稍候',
            install: '下载',
            upload: '上传'
        },
        topmenu: {
            version: '版本',
            sure_to_quit: '确定要退出 FLUX Studio?',
            flux: {
                label: 'Flux',
                about: '关于 FLUX studio',
                preferences: '设置',
                quit: '退出'
            },
            file: {
                label: '文件',
                import: '导入',
                save_fcode: '导出工作',
                save_scene: '导出场景',
                reset: '重置设置',
                confirmReset: '是否确定要重置所有设置?'
            },
            edit: {
                label: '編輯',
                duplicate: '重製',
                rotate: '旋轉',
                scale: '縮放',
                reset: '重置',
                clear: '清除場景',
                undo: '復原'
            },
            device: {
                label: '机器',
                new: '新增机器',
                device_monitor: '儀表板',
                device_info: '机器資訊',
                change_filament: '更換線料',
                default_device: '設為預設',
                check_firmware_update: '软件更新',
                update_delta: 'Delta 软件',
                update_toolhead: '工具頭软件',
                calibrate: '校正平台',
                set_to_origin: '回歸原點',
                scan_laser_calibrate: '打開掃描雷射',
                clean_calibration: '校正平台（清除原始資料）',
                commands: '指令',
                set_to_origin_complete: 'Delta 已回歸原點',
                scan_laser_complete: '掃描雷射已開啟，點擊 "完成" 以關閉雷射',
                finish: '完成'
            },
            window: {
                label: '視窗',
                minimize: '最小化',
                fullscreen: '全螢幕'
            },
            help: {
                label: '說明',
                help_center: '說明中心',
                contact: '聯絡我們',
                tutorial: '列印教學',
                software_update: '軟體更新',
                debug: '錯誤回報',
                forum: '社群論壇'
            }
        },
        initialize: {
            // generic strings
            next: '下一步',
            start: '开始设置',
            skip: '跳过',
            cancel: '取消',
            confirm: '确认',
            connect: '连接',
            back: 'Back',
            retry: 'RETRY',
            no_machine : '目前沒有机器，跳过此步骤',

            // specific caption/content
            invalid_device_name: '机器名稱只能使用中文字，英文字母、數字、空格以及特殊符号  “(”, “)”, “-”, “_”, “’”, “\'”',
            require_device_name: '名稱欄位為必填',
            select_language: '请选择你想使用的语言',
            change_password: {
                caption: '密碼更改',
                content: '確定要更改密碼嗎?'
            },
            connect_flux: '连接 FLUX Delta',
            via_usb: '使用 USB',
            via_wifi: '使用 WiFi',
            name_your_flux: '為你的 FLUX Delta 取一個獨特的名字',
            wifi_setup: '設定無線網路',
            select_preferred_wifi: '选择你偏好的網路',
            requires_wifi_password: '需要密碼',
            connecting: '连接中',

            // page specific
            set_machine_generic: {
                printer_name: '机器名稱*',
                printer_name_placeholder: '例如：霹靂五號',
                old_password: '舊密碼',
                password: '机器密碼',
                set_station_mode: '設定成無線基地台',
                password_placeholder: '從壞人手上保護你的 Delta',
                incorrect_old_password: '舊密碼錯誤',
                incorrect_password: '密碼錯誤',
                ap_mode_name: '網路名稱',
                ap_mode_pass: '密碼',
                ap_mode_name_format: '只接受英文及數字',
                ap_mode_pass_format: '请至少輸入 8 個字',
                ap_mode_name_placeholder: '最多 32 個字',
                ap_mode_pass_placeholder: '至少 8 個字',
                create_network: '建立網路',
                join_network: '加入網路',
                security: '安全層級'
            },

            setting_completed: {
                start: '进入软件',
                is_ready: '“%s” 准备完成',
                station_ready_statement: '你的 FLUX Delta 已成为 Wi-Fi 热点，你可以通过无限连接 “%s” 来操作 FLUX',
                brilliant: '太棒了!',
                begin_journey: '你可以拔掉 Micro USB 数据线, 开始使用 FLUX Delta 随心所欲的进行创作咯！',
                great: '欢迎使用 FLUX Studio',
                upload_via_usb: '你可以稍后再设置 Wi-Fi 选项。<br/>如果你沒有 Wi-Fi 环境，请参考<a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/215998327-Connection-Guide-for-Desktop-PCs">PC连接指南</a>',
                back: '回到 Wi-Fi 设置',
                ok: '进入软件'
            },

            notice_from_device: {
                headline: '檢查 WiFi 指示燈',
                subtitle: '机器上的綠燈表示了 FLUX Delta 的連線狀態',
                light_on: 'Light On: 綠燈恆亮',
                light_on_desc: 'FLUX Delta 已經連上了指定網路',
                breathing: 'Breathing: 呼吸燈',
                breathing_desc: '無線網路設定失敗，请嘗試重新設定',
                successfully: '如果 FLUX Delta 連線成功',
                successfully_statement: '请將無線網路連線至(%s)，並且重新啟動 FLUX Studio',
                restart: 'Restart FLUX Studio'
            },

            // errors
            errors: {
                error: '错误',
                not_found: '无法找到 FLUX Delta',
                not_support: '请更新 Delta 软件到 v1.1 以上',

                keep_connect: {
                    caption: '无法通过 USB 连接',
                    content: '别担心！请确认电源已开启以及使用 Micro-Usb 连接机器，并正确安装驱动程序。<a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/215327328">详细信息</a>'
                },

                wifi_connection: {
                    caption: '无法连接此 Wi-Fi',
                    connecting_fail: '请确认信号强度以及密码正确'
                },

                select_wifi: {
                    ap_mode_fail: '基地台模式设定失败'
                }
            }
        },
        wifi: {
            home: {
                line1: '请問你所處的環境擁有可以連線的 Wi-Fi 嗎?',
                line2: '我們將協助你將 FLUX 連線至你家中的 Wi-Fi',
                select: '是的，開始連線'
            },
            set_password: {
                line1: '请輸入「',
                line2: '」無線網路的連線密碼',
                password_placeholder: '请輸入 Wi-Fi 密碼',
                back: '上一步',
                join: '加入',
                connecting: '連線中'
            },
            success: {
                caption: '太棒了，連線成功!',
                line1: '接下來，我們將為你的机器做一些簡單的設定。',
                next: '下一步'
            },
            failure: {
                caption: '連線失敗',
                line1: '请確認你的 Wi-Fi 是否正常運作後，再重新連線',
                next: '重新連線'
            },
            set_printer: {
                caption: '為你的 FLUX3D Printer 設定名稱與密碼',
                printer_name: '名稱',
                printer_name_placeholder: '設定名稱',
                password: '密碼',
                password_placeholder: '設定密碼',
                notice: '設定密碼，可以確保你的 FLUX 只有知道密碼的人可以操作',
                next: '下一步'
            }
        },
        menu: {
            print: '列印',
            laser: '雷雕',
            scan: '掃描',
            usb: 'USB',
            device: '机器',
            setting: '設定',
            draw: '繪製'
        },
        settings: {
            caption: '設定',
            tabs: {
                general: '一般',
                device: '机器'
            },
            ip: '机器 IP 位址',
            wrong_ip_format: 'IP格式錯誤',
            language: '語言',
            notifications: '通知',
            close: '關閉',
            printer: {
                new_printer: '新增成型機',
                name: '成型機名稱',
                current_password: '目前密碼',
                set_password: '設定密碼',
                security_notice: '你可以用密碼保護你的成型機',
                connected_wi_fi: 'Wi-Fi 連線',
                advanced: '進階',
                join_other_network: '加入其它網路',
                your_password: '新密碼',
                confirm_password: '確認密碼',
                save_password: '儲存變更'
            },
            flux_cloud: {
                caption: 'Get FLUX 3D Printer be remote!',
                line1: 'Control your FLUX 3D Printer with FLUX Cloud in anywhere you are',
                start_to_use: 'Start to Use',
                i_have_an_account: 'I have an account',
                email: '電子信箱',
                password: '密碼',
                change_password: '變更密碼',
                connected_printer: '已连接成型機',
                connect: '连接'
            },
            cancel: '取消',
            done: '完成',
            connect_printer: {
                title: '选择连接成型機'
            },
            notification_on: '開啟',
            notification_off: '關閉',
            engine_change_fail: {
                'caption': 'unable to change engine ',
                '1': 'error during checking',
                '2': 'cura version error',
                '3': 'path is not cura',
                '4': 'path is not a exist file, please check engine path in setting section'
            },
            allow_tracking: '您是否願意自動傳送匿名用量資料，協助 FLUX 改進產品和服務？'
        },
        print: {
            import: '匯入',
            save: '儲存⋯',
            support_view: 'Support Preview',
            start_print: '列印',
            advanced: {
                general: '一般',
                layers: '切層',
                infill: '填充',
                support: '支撐',
                speed: '速度',
                custom: '專家',
                slicingEngine: '切片引擎',
                slic3r: 'Slic3r',
                cura: 'Cura',
                filament: '線料',
                temperature: '溫度',
                detect_filament_runout: '偵測線料',
                flux_calibration: '自動校正',
                detect_head_tilt: '偵測工具頭傾斜',
                layer_height_title: '層高',
                layer_height: '一般層高',
                firstLayerHeight: '底層層高',
                shell: '物件外殼',
                shellSurface: '物件外殼圈數',
                solidLayerTop: '頂部實心層數',
                solidLayerBottom: '底部實心層數',
                density: '填充密度',
                pattern: '填充圖樣',
                auto: 'auto',                       // do not change
                line: 'line',                       // do not change
                rectilinear: 'rectilinear',         // do not change
                rectilinearGrid: 'rectilinear-grid',// do not change
                honeycomb: 'honeycomb',             // do not change
                curaInfill: {
                    automatic: 'AUTOMATIC',
                    grid: 'GRID',
                    lines: 'LINES',
                    concentric: 'CONCENTRIC'
                },
                curaSupport: {
                    grid: 'GRID',
                    lines: 'LINES'
                },
                blackMagic: '黑魔法',
                spiral: '螺旋',
                generalSupport: '支撐',
                spacing: '支撐間隙',
                overhang: '懸空角度',
                zDistance: 'Z 軸間隙',
                raft: '底座',
                raftLayers: '底座層數',
                brim: '底部延伸圈數 (Brim)',
                skirts: '邊界預覽 (Skirt)',
                movement: '移動速度',
                structure: '結構速度',
                traveling: '移動',
                surface: '表面速度',
                firstLayer: '底層',
                solidLayers: '實心層',
                innerShell: '外殼內圈',
                outerShell: '外殼外圈',
                bridge: '架橋',
                config: '設定',
                presets: '預設',
                name: '名稱',
                apply: '套用',
                save: '儲存',
                saveAsPreset: '儲存參數',
                cancel: '取消',
                delete: '刪除',
                loadPreset: '載入參數',
                savePreset: '儲存參數',
                reloadPreset: '重置參數',
                printing: '列印溫度',
                firstLayerTemperature: '首層溫度'
            },
            mode: [
                {
                    value: 'beginner',
                    label: 'Beginner',
                    checked: true
                },
                {
                    value: 'expert',
                    label: 'Expert'
                }
            ],
            params: {
                beginner: {
                    print_speed: {
                        text: '列印速度',
                        options: [
                            {
                                value: 'slow',
                                label: '中'
                            },
                            {
                                value: 'fast',
                                label: '快',
                                selected: true
                            }
                        ]
                    },
                    material: {
                        text: '材質',
                        options: [
                            {
                                value: 'pla',
                                label: 'PLA',
                                selected: true
                            }
                        ]
                    },
                    support: {
                        text: '支撐',
                        on: '支撐',
                        off: '關閉',
                        options: [
                            {
                                value: 'everywhere',
                                label: 'Everywhere',
                                checked: true
                            },
                            {
                                value: 'nowhere',
                                label: 'nowhere'
                            }
                        ]
                    },
                    platform: {
                        text: '平台',
                        options: [
                            {
                                value: 'raft',
                                label: '墊片',
                                selected: true
                            }
                        ]
                    }
                },
                expert: {
                    layer_height: {
                        text: '每層高度',
                        value: 0.3,
                        unit: 'mm'
                    },
                    print_speed: {
                        text: '列印速度',
                        value: 50,
                        unit: 'mm/s'
                    },
                    temperature: {
                        text: 'Temperature',
                        value: 231,
                        unit: '°C'
                    },
                    support: {
                        text: 'Support',
                        options: [
                            {
                                value: 'everywhere',
                                label: 'Everywhere',
                                checked: true
                            },
                            {
                                value: 'nowhere',
                                label: 'nowhere'
                            }
                        ]
                    },
                    platform: {
                        text: 'Platform',
                        options: [
                            {
                                value: 'raft',
                                label: 'Raft',
                                checked: true
                            }
                        ]
                    }
                }
            },
            left_panel: {
                raft_on: '底座 ON',
                raft_off: '底座 OFF',
                support_on: '支撐 ON',
                support_off: '支撐 OFF',
                advanced: '進階選項',
                preview: '預覽路徑',
                plaTitle: 'PICK THE COLOR OF THE FILAMENT',
                transparent: 'TRANSPARENT',
                raftTitle: 'A Raft are layers built under your part and help it stick to the base plate',
                supportTitle: 'A Support is a generated structure to support overhanging part of your object, to prevent filament dropping',
                advancedTitle: 'Detail 3d printing parameters, you may acheive better result than default by adjusting them',
                confirmExitFcodeMode: '離開預覽模式將會移除Fcode，是否繼續？'
            },
            right_panel: {
                get: 'Get',
                go: 'Go',
                preview: '預覽'
            },
            quality: {
                high: '品質 精細',
                med: '品質 中等',
                low: '品質 快速',
                custom: '品質 自訂'
            },
            scale: '尺寸',
            rotate: '旋轉',
            delete: '刪除',
            reset: '重設',
            cancel: '取消',
            done: '確認',
            pause: '暫停',
            restart: '重新開始',
            download_prompt: '请輸入檔案名稱',
            importTitle: '匯入 3D 模型 ( .stl )',
            getFcodeTitle: '儲存FLUX列印工作',
            goTitle: '準備列印',
            deviceTitle: '顯示監控介面',
            rendering: '切片中',
            reRendering: '重新切片中',
            finishingUp: '完成中',
            savingFilePreview: '產生預覽圖',
            uploading: '讀取中',
            uploaded: '已上傳，分析模型中',
            importingModel: '匯入模型',
            wait: '请稍候',
            out_of_range: '超過列印範圍',
            out_of_range_message: '请縮小物件尺寸',
            drawingPreview: '繪製預覽路徑，请稍候',
            gettingSlicingReport: '正在取得最新切片狀態'
        },
        draw: {
            pen_up: '移動高度',
            pen_down: '繪製高度',
            speed: '速度',
            pen_up_title: '筆不會碰到繪製表面的 Z 軸距離',
            pen_down_title: '筆會碰到繪製表面的 Z 軸距離, 必須比移動高度低',
            speed_title: '握架工具頭移動的速度',
            units: {
                mms: 'mm/s',
                mm: 'mm'
            }
        },
        laser: {
            import: '匯入',
            save: '儲存⋯',
            custom: '自訂',
            presets: '預設',
            button_advanced: '進階',
            confirm: '確認',
            get_fcode: '儲存<br/>工作',
            name: '名稱',
            go: 'GO',
            process_caption: '輸出中',
            laser_accepted_images: '雕刻支援格式：BMP/GIF/JPG/PNG/SVG',
            draw_accepted_images: '繪製支援格式：SVG',
            svg_fail_messages: {
                'TEXT_TAG': '不支援標籤 &lt;text&gt;',
                'DEFS_TAG': '不支援標籤 &lt;defs&gt;',
                'CLIP_TAG': '不支援標籤 &lt;clip&gt;',
                'FILTER_TAG': '不支援標籤 &lt;filter&gt;',
                'EMPTY': '內容為空',
                'FAIL_PARSING': '解析錯誤',
                'SVG_BROKEN': '檔案損壞',
                'NOT_SUPPORT': '非 SVG 格式'
            },
            title: {
                material: 'Select proper material to have the best engraving result.',
                object_height: 'A Raft are layers built under your part and help it stick to the base plate.',
                shading: 'Shading enables gradient effect of laser engraving. It takes longer time.',
                advanced: 'Custom settings for power and speed'
            },
            print_params: {
                object_height: {
                    text: '物體高度',
                    unit: 'mm'
                },
                shading: {
                    text: '漸層',
                    textOn: 'ON',
                    textOff: 'OFF',
                    checked: true
                }
            },
            object_params: {
                position: {
                    text: '位置'
                },
                size: {
                    text: '尺寸',
                    unit: {
                        width: '寬',
                        height: '高'
                    }
                },
                rotate: {
                    text: '旋轉'
                },
                threshold: {
                    text: '圖片曝光',
                    default: 128
                }
            },
            advanced: {
                label: '進階選項',
                form: {
                    object_options: {
                        text: '材質',
                        label: '材質選項',
                        options: [
                            {
                                value: 'wood',
                                label: '木板',
                                data: {
                                    laser_speed: 3,
                                    power: 255
                                }
                            },
                            {
                                value: 'steel',
                                label: '皮革',
                                data: {
                                    laser_speed: 5,
                                    power: 255
                                }
                            },
                            {
                                value: 'paper',
                                label: '紙',
                                data: {
                                    laser_speed: 2,
                                    power: 255
                                }
                            },
                            {
                                value: 'cork',
                                label: '軟木',
                                data: {
                                    laser_speed: 5,
                                    power: 255
                                }
                            },
                            {
                                value: 'other',
                                label: '其它',
                                data: {}
                            }
                        ]
                    },
                    laser_speed: {
                        text: '雷射速度',
                        unit: 'mm/s',
                        fast: '快',
                        slow: '慢',
                        min: 0.8,
                        max: 20,
                        step: 0.1
                    },
                    power: {
                        text: '雷射強度',
                        high: '強',
                        low: '弱',
                        min: 0,
                        max: 255,
                        step: 1
                    }
                },
                save_and_apply: '儲存並套用',
                save_as_preset: '儲存',
                save_as_preset_title: '儲存預設',
                load_preset_title: '載入',
                background: '自訂背景',
                apply: '套用',
                cancel: '取消',
                save: '儲存'
            }
        },
        scan: {
            stop_scan: '取消',
            over_quota: '超過可容納點雲',
            convert_to_stl: '轉換成 STL',
            scan_again: '再次掃描',
            start_multiscan: '多次掃描',
            processing: '處理中...',
            remaining_time: '剩餘時間',
            do_save: '儲存 STL',
            go: '開始',
            rollback: '返回',
            error: '錯誤',
            confirm: '確認',
            caution: '警告',
            cancel: '取消',
            delete_mesh: '真的要刪除嗎?',
            quality: '品質',
            scan_again_confirm: '是否確定要放棄目前的掃瞄結果？',
            calibrate: '校正',
            calibration_done: {
                caption: '校正完成',
                message: '你可以開始掃描了'
            },
            cant_undo: '無法復原',
            estimating: '估計中...',
            calibrate_fail: '校正失敗',
            calibration_is_running: '掃描校正中',
            resolution: [{
                id: 'best',
                text: '最佳',
                time: '~30分鐘',
                value: 1200
            },
            {
                id: 'high',
                text: '精細',
                time: '~20分鐘',
                value: 800
            },
            {
                id: 'normal',
                text: '中等',
                time: '~10分鐘',
                value: 400
            },
            {
                id: 'low',
                text: '快速',
                time: '~5分鐘',
                value: 200
            },
            {
                id: 'draft',
                text: '草稿',
                time: '~2分鐘',
                value: 100
            }],
            save_mode: [
                {
                    value: 'stl',
                    label: 'STL',
                    checked: true
                },
                {
                    value: 'pcd',
                    label: 'PCD'
                },
            ],
            manipulation: {
                filter: '操作',
                position: '位置',
                size: '尺寸',
                rotate: '旋轉',
                crop: '剪裁',
                manual_merge: '手動合併',
                clear_noise: '去除噪點',
                save_pointcloud: '輸出點雲'
            },
            size: {
                x: 'X',
                y: 'Y',
                z: 'Z'
            },
            rotate: {
                x: 'X',
                y: 'Y',
                z: 'Z'
            },
            translate: {
                x: 'X',
                y: 'Y',
                z: 'Z'
            },
            messages: {
                'not open': {
                    caption: '未偵測到鏡頭畫面 / 畫面太暗',
                    message: '壓下，然後拉出掃描鏡頭，直至最底端發出固定聲為止。'
                },
                'no object': {
                    caption: '未偵測到校正工具',
                    message: '请將掃描校正工具插在中心溝槽處，確保光源充足。'
                },
                'no laser': {
                    caption: '未偵測到掃描雷射',
                    message: '请壓下，並彈出掃描雷射頭，確保光源不要過亮。'
                }
            }
        },
        select_printer: {
            choose_printer: '请选择要設定的机器',
            notification: '"%s" 需要密碼',
            submit: '送出',
            please_enter_password: '"密碼',
            auth_failure: '認證失敗',
            retry: '重新选择',
            unable_to_connect: '#008 無法與机器建立穩定連線'
        },
        device: {
            pause: '暫停',
            paused: '已暫停',
            pausing: '正在暫停',
            selectPrinter: '选择成型機',
            retry: '重試',
            status: '狀態',
            busy: '忙碌中',
            ready: '待命中',
            reset: '重設(kick)',
            abort: '取消工作',
            start: '開始',
            please_wait: '请稍待...',
            quit: '中斷連結',
            heating: '加熱中',
            completing: '完成中',
            aborted: '已終止',
            completed: '已完成',
            calibrating: '校正中',
            starting: '啟動中',
            resuming: '恢復中',
            scanning: '掃描',
            occupied: '裝置被佔用',
            running: '工作中',
            uploading: '上傳中',
            processing: '處理中',
            disconnectedError: {
                caption: '机器連線中斷',
                message: '请確認 %s 的網路連線是否正常'
            },
            noTask: '目前無任何工作',
            pleaseWait: '请稍待...',
            finishing: '完成中',
            initiating: '啟動中',
            unknown: '未知狀態',
            pausedFromError: '發生錯誤暫停',
            IP: 'IP',
            serial_number: '序號',
            firmware_version: '软件版本',
            UUID: 'UUID',
            select: '选择',
            deviceList: '机器列表',
            calibration: {
                title: '自動校正',
                A: '水平與高度',
                H: '高度',
                N: '關閉',
                byFile: '根據 FCODE 設定'
            },
            detectFilament: {
                title: '偵測線料',
                on: '開啟',
                off: '關閉',
                byFile: '根據 FCODE 設定'
            },
            filterHeadError: {
                title: '工具頭錯誤偵測',
                shake: '過度搖晃',
                tilt: '傾斜',
                fan_failure: '風扇故障',
                laser_down: '雷射安全鎖',
                byFile: '根據 FCODE 設定',
                no: '關閉'
            },
            autoresume: {
                title: '智慧工作恢復',
                on: '開啟',
                off: '關閉'
            },
            broadcast: {
                title: 'UPNP 廣播',
                L: '預設',
                A: '密集',
                N: '關閉'
            }
        },
        monitor: {
            change_filament                     : 'CHANGE FILLAMENT',
            browse_file                         : 'BROWSE FILE',
            monitor                             : 'MONITOR',
            currentTemperature                  : 'Current Temp',
            nothingToPrint                      : 'There is nothing to print',
            go                                  : '開始',
            start                               : '開始',
            pause                               : '暫停',
            stop                                : '停止',
            record                              : 'RECORD',
            camera                              : '監控',
            connecting                          : '連線中，请稍候',
            HEAD_OFFLINE                        : '#110 沒有偵測到工具頭\n请確認工具頭傳輸線完整插入 <a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/218183157">详细信息</a>',
            HEAD_ERROR_CALIBRATING              : '#112 工具頭校正失誤\n请重新裝載工具頭，並確認磁鐵關節的附著',
            HEAD_ERROR_FAN_FAILURE              : '#113 風扇無法轉動\n请嘗試用細針戳一下 <a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/217732178">详细信息</a>',
            HEAD_ERROR_HEAD_OFFLINE             : '#110 沒有偵測到工具頭\n请確認工具頭傳輸線完整插入 <a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/218183157">详细信息</a>',
            HEAD_ERROR_TYPE_ERROR               : '#111 偵測到錯誤工具頭\n请安裝正確的對應工具頭',
            HEAD_ERROR_INTLK_TRIG               : '#116 偵測到雕刻工具頭傾斜\n请確認金屬棒正確連結，雕刻頭與握架緊密結合以繼續<a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/217085937">详细信息</a>',
            HEAD_ERROR_RESET                    : '#114 工具頭傳輸線接觸不良\n请確認工具頭傳輸線完整插入以繼續，如持續發生此問題，请聯繫 FLUX 客服 <a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/218183167">详细信息</a>',
            HEAD_ERROR_TILT                     : '#162 偵測到工具頭傾斜\n请確認球型關節正確附著以繼續',
            HEAD_ERROR_SHAKE                    : '#162 偵測到工具頭傾斜\n请確認球型關節正確附著以繼續',
            HEAD_ERROR_HARDWARE_FAILURE         : '#164 工具頭溫度異常\n请聯繫 FLUX 客服<a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/218415378">详细信息</a>',
            'HEAD_ERROR_?'                      : '#199 Toolhead error\nCheck if the toolhead is abnormal',
            HARDWARE_ERROR_FILAMENT_RUNOUT      : '#121 沒有偵測到線料\n请重新插入新的線料 <a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/218931757">详细信息</a>',
            HARDWARE_ERROR_0                    : '#121 沒有偵測到線料\n请重新插入新的線料 <a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/218931757">详细信息</a>',
            HARDWARE_ERROR_PLATE_MISSING        : '#122 沒有偵測到工作平台\n请放上工作平台金屬板',
            HARDWARE_ERROR_ZPROBE_ERROR         : '#123 水平校正失敗\n请移除可能影響校正的物體（噴嘴殘料、工作平台上雜質）<a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/218931767">详细信息</a>',
            HARDWARE_ERROR_CONVERGENCE_FAILED   : '#123 水平校正失敗\n请移除可能影響校正的物體（噴嘴殘料、工作平台上雜質）<a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/218931767">详细信息</a>',
            HARDWARE_ERROR_HOME_FAILED          : '#124 原點校正失敗\n请排除軌道上異物，確定傳輸線不會被夾到 <a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/218931807">详细信息</a>',
            HARDWARE_ERROR_MAINBOARD_ERROR      : '#401 主板沒有回應。请聯繫 FLUX 客服。',
            HARDWARE_ERROR_SUBSYSTEM_ERROR      : '#402 子系統沒有回應。请聯繫 FLUX 客服。',
            WRONG_HEAD                          : '请更換成列印工具頭',
            USER_OPERATION                      : '別的使用者正在佔用机器',
            RESOURCE_BUSY                       : '机器忙碌中\n如果机器沒有在進行動作， 请重新啟動机器',
            DEVICE_ERROR                        : '裝置錯誤\n请重新啟動机器',
            NO_RESPONSE                         : '裝置錯誤\n请重新啟動机器',
            SUBSYSTEM_ERROR                     : '#402 子系統沒有回應。请聯繫 FLUX 客服。',
            HARDWARE_FAILURE                    : '裝置錯誤\n请重新啟動机器',
            MAINBOARD_OFFLINE                   : '裝置錯誤\n请重新啟動机器',
            G28_FAILED                          : '#124 原點校正失敗\n请排除軌道上異物，並重新插拔工具頭连接線 <a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/218931807">详细信息</a>',
            FILAMENT_RUNOUT_0                   : '#121 沒有偵測到線料\n请重新插入新的線料 <a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/218931757">详细信息</a>',
            processing                          : '處理中',
            savingPreview                       : '正在產生預覽圖',
            hour                                : '小時',
            minute                              : '分',
            second                              : '秒',
            left                                : '完成',
            temperature                         : '溫度',
            forceStop                           : '是否強制停止現在工作?',
            upload                              : '上傳',
            download                            : '下載',
            fileNotDownloadable                 : '下載不支援此檔案格式',
            cannotPreview                       : '無法預覽此檔案',
            extensionNotSupported               : '上傳檔案不支援此檔案格式',
            fileExistContinue                   : '檔案已存在，是否要覆蓋？',
            confirmGToF                         : 'GCode 上傳後會自動轉檔成 FCode，是否繼續？',
            updatePrintPresetSetting            : 'FLUX STUDIO 有新的預設列印參數。\n是否要更新？（會刪除目前參數）',
            confirmFileDelete                   : '是否確定要刪除這個檔案？',
            task: {
                EXTRUDER                        : '列印工作',
                LASER                           : '雕刻工作',
                DRAW                            : '繪製工作',
                'N/A'                           : '繪製工作'
            },
            device: {
                EXTRUDER                        : '列印工具頭',
                LASER                           : '雕刻工具頭',
                DRAW                            : '繪製工具頭'
            },
            cant_get_toolhead_version           : '無法取得最新版本資訊'
        },
        alert: {
            caption: '錯誤',
            duplicated_preset_name: '重複的預設名稱',
            info: '訊息',
            warning: '警告',
            error: '錯誤',
            retry: '重試',
            abort: '放棄',
            cancel: '取消',
            close: '關閉',
            ok: '確定',
            yes: ' 是',
            no: '否',
            stop: '停止'
        },
        caption: {
            connectionTimeout: '連線逾時'
        },
        message: {
            connecting: '連線中...',
            connected: '已連線',
            machineNotConnected: 'Machine is not connected',
            notPrinting: 'Printing is not in progress',
            nothingToPrint: 'Nothing to print (source blob missing)',
            connectionTimeout: '请確認你的網路狀態和 FLUX Delta 的 Wi-Fi 指示燈是否為恆亮',
            device_not_found: {
                caption: '找不到預設机器',
                message: '请確認預設机器的 Wi-Fi 指示燈，或取消設定預設裝置'
            },
            device_busy: {
                caption: '机器忙碌中',
                message: '机器正在進行另外一項工作，请稍候再試。如果裝置持續沒有回應，请將裝置重新啟動。'
            },
            device_is_used: '机器正被使用中，是否要終止現在任務？',
            invalidFile: '檔案不是正確的 STL 格式',
            failGeneratingPreview: '無法儲存預覽圖',
            slicingFailed: 'Slic3r 切片錯誤',
            no_password: {
                content: '请用 USB 設定机器密碼，以提供此台電腦連線',
                caption: '未設定密碼'
            },
            image_is_too_small: '圖檔內容有誤',
            monitor_too_old: {
                caption: '软件需要更新',
                content: '请按照<a target="_blank" href="http://helpcenter.flux3dp.com/hc/zh-tw/articles/216251077">此說明</a>安裝最新软件版本'
            },
            cant_establish_connection: '無法正常啟動 FLUX Studio API，建議手動安裝 Visual C++ Redistributable 2015，如持續發生，请<a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/requests/new" target="_blank">聯繫 FLUX 客服</a>',
            application_occurs_error: '應用程式發生異常，请使用「功能表 > 說明 > 錯誤回報」',
            error_log: '錯誤訊息',
            fcodeForLaser: '檔案為雕刻工作',
            fcodeForPen: '檔案為繪圖工作',
            confirmFCodeImport: '載入.fc檔案將清除目前所有場景，是否繼續？',
            confirmSceneImport: '載入.fsc檔案將清除目前所有場景，是否繼續？',
            brokenFcode: '無法開啟 %s',
            slicingFatalError: '切片時發生錯誤，请上傳模型檔案給 FLUX 客服',
            unknown_error: '無法與机器建立連線，请使用「功能表 > 說明 > 錯誤回報」',
            important_update: {
                caption: '重要更新',
                message: 'Delta 有重要软件更新，是否要現在更新？',
            },
            unsupport_osx_version: '不支援此 Mac OS X 版本',
            need_password: '需要密碼與 FLUX Delta 建立連線',
            new_app_downloading: '下載中',
            ask_for_upgrade: '馬上升級嗎?',
            need_1_1_7_above: '请更新 Delta 软件到 v1.1.7 以上'
        },
        machine_status: {
            '-10': '原生模式',
            '-2': '掃描中',
            '-1': '維護中',
            0: '待命中',
            1: '初始化',
            2: 'ST_TRANSFORM',
            4: '啟動中',
            6: '回復中',
            16: '工作中',
            18: '回復中',
            32: '已暫停',
            36: '已暫停',
            38: '暫停中',
            48: '已暫停',
            50: '暫停中',
            64: '已完成',
            66: '完成中',
            128: '已中斷',
            UNKNOWN: '-'
        },
        head_module: {
            EXTRUDER: 'Print',
            UNKNOWN: '',
            error: {
                'missing': '錯誤訊息不足',
                '0': 'Unknown module',
                '1': 'Sensor communication failure',
                '2': 'No hello', // pi will send head_error_reset before this is issued
                '3': '#112 工具頭校正失誤\n请重新裝載工具頭，並確認磁鐵關節的附著',
                '4': '#162 偵測到工具頭傾斜\n请確認球型關節正確附著以繼續',
                '5': '#162 偵測到工具頭傾斜\n请確認球型關節正確附著以繼續',
                '6': '#119 列印工具頭無法控制溫度，请聯繫 FLUX 客服。',
                '7': '#113 風扇無法轉動\n请嘗試用細針戳一下 <a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/217732178">详细信息</a>',
                '8': '#116 偵測到雕刻工具頭傾斜\n请確認金屬棒正確連結，雕刻頭與握架緊密結合以繼續<a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/217085937">详细信息</a>',
                '9': '#118 列印工具頭無法加溫，请聯繫 FLUX 客服。'
            }
        },
        change_filament: {
            home_caption: '更換線料',
            load_filament_caption: '自動進料',
            unload_filament_caption: '自動退料',
            cancel: '取消',
            load_filament: '自動進料',
            unload_filament: '自動退料',
            next: '下一步',
            heating_nozzle: '列印工具頭加熱中',
            unloading: '自動退料中',
            loaded: '進料完成',
            unloaded: '退料完成',
            ok: '確定',
            auto_emerging: '请插入線料',
            maintain_head_type_error: '列印工具頭未正確安裝',
            maintain_zombie: '请重新啟動机器',
            toolhead_no_response: '#117 列印模組沒有回應 <a target="_blank" href="https://flux3dp.zendesk.com/hc/zh-tw/articles/218347477">详细信息</a>'
        },
        input_machine_password: {
            require_password: '"%s" 需要密碼',
            connect: '连接',
            password: '密碼'
        },
        set_default: {
            success: '%s 已設為預設机器',
            error: '由於網路問題，無法將 %s 設為預設机器'
        },
        tutorial: {
            set_first_default_caption: '歡迎使用',
            set_first_default: '是否要將 %s 設為預設机器?',
            startWithFilament: '首先，讓我們先填裝線料',
            startWithModel: '接下來，讓我們載入範例3Ｄ模型',
            startTour: '嗨，歡迎<br/>這是你第一次使用列印功能,<br/>你希望觀看列印功能教學嗎？',
            clickToImport: '點擊匯入以載入 3D 模型',
            selectQuality: '选择列印品質',
            clickGo: '按下開始以準備列印',
            startPrint: '確定平台上沒有格線，並於平台上塗上足厚口紅膠待其乾燥，即可開始列印',
            skip: '跳過教學'
        },
        slicer: {
            computing: '計算中',
            error: {
                '6': '工作路徑超過列印範圍, 请縮小物體尺寸、關閉底座、底部延伸圈數或是邊界預覽',
                '7': '進階設定參數錯誤\n',
                '8': '無切片資料，切片結果要求早於切片結束',
                '9': '無路徑資料，路徑結果要求早於切片結束',
                '10': '刪除錯誤，原始模型不存在於切片引擎',
                '13': '重制錯誤，複製原始ID不存在。请重新啟動程式，\n若此錯誤持續發生，请回報相關錯誤',
                '14': '無法設定物件位置及相關資訊，原始模型不存在於切片引擎',
                '15': '上傳檔案內容錯誤，请確認檔案內容後再上傳'
            },
            pattern_not_supported_at_100_percent_infill: 'Slic3r 的 rectilinear 填充圖樣只支援 100% 的填充密度'
        },
        calibration: {
            RESOURCE_BUSY: '请確認机器的狀態是於待命中',
            headMissing: '無法取得工具頭資訊，请確認工具頭是否连接於机器',
            calibrated: '平台校正完成',
            extruderOnly: '请使用列印工具頭來做校正'
        }
    };
});
