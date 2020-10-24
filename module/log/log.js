/**
 * 文件日志逻辑
 */
let log4js = require('log4js');

exports.init = () => {
    let  logFormat = {
        appenders: {                      // 从log4js 2.0版本以后 这里从一个array变为了json形式。
            // dateFileLog: {                 // 定义存储为文件形式日志类型的名称(名称可随意起)
            //     type: 'dateFile',
            //     filename: "./log/logs/syslog", // 项目根目录开始
            //     pattern: "-yyyy-MM-dd_error.log", // 存储的文件名称为 logs_yyyy-MM-dd_error.log(当天的日期)
            //     alwaysIncludePattern: true,     //文件名是否始终包含占位符
            //     absolute: false               //filename是否绝对路
            // },
            syslog: {                 // 定义存储为文件形式日志类型的名称(名称可随意起)
                type: 'dateFile',
                filename: "./log/logs/syslog", // 项目根目录开始
                pattern: "-yyyy-MM-dd.log", // 存储的文件名称为 logs_yyyy-MM-dd_error.log(当天的日期)
                alwaysIncludePattern: true,     //文件名是否始终包含占位符
                absolute: false               //filename是否绝对路
            },
            logConLog: {                    // 定义在控制台输出的日志类型的名称
                type: 'console',
                filename: "./log/logs/console", // 项目根目录开始
                pattern: "-yyyy-MM-dd.log", // 存储的文件名称为 logs_yyyy-MM-dd_error.log(当天的日期)
                alwaysIncludePattern: true,     //文件名是否始终包含占位符
                absolute: false
            }
        },
        categories: {                     // 这里面的配置是什么意思我也没仔细看过文档
            default: {
                appenders: ['syslog'],
                level: 'ALL'
            },
            logConLog: {
                appenders: ['logConLog'],
                level: 'ALL'
            },
            syslog: {
                appenders: ['logConLog','syslog'],
                level: 'ALL'  //trace，debug，info，warn，error
            }
        }
    };

    log4js.configure(logFormat);

    global.logger = {};
    global.logger.info = (data, fileName = 'syslog', format = true) => {
        log4js.getLogger(fileName).info(data);
    };
    global.logger.debug = (data, fileName = 'syslog', format = true) => {
        log4js.getLogger(fileName).debug(data);
    };
    global.logger.warn = (data, fileName = 'syslog', format = true) => {
        log4js.getLogger(fileName).warn(data);
    };
    global.logger.error = (data, fileName = 'syslog', format = true) => {
        log4js.getLogger(fileName).error(data);
    };
    console.log(`日志初始化成功`);
};


