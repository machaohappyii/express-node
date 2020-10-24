'use strict';
var _ = require('lodash');
var mysql = require('mysql');
var mconfig = require('../config/mysql');
var colors = require('colors');
var common = require('../../lib/common');

var mysqlConfig = {};
exports.init = () => {
    mysqlConfig = mconfig[global.ENV];
    global.mysql = {};
    _.each(mysqlConfig, (value, key) => {
        exports.conn(key, value);
    });
};

exports.conn = (key, conf) => {
    let pool = mysql.createPool({
        host: conf.host,
        port: conf.port,
        user: conf.user,
        password: conf.password,
        database: conf.db,
        timezone: 'Asia/Shanghai',
        connectionLimit: conf.pool || 1
    });
    global.mysql[key] = pool;
    console.log(`Load mysql ${colors.green(conf.db)}  success`);
    if (_.size(mysqlConfig) == _.size(global.mysql)) {
        console.log(`Load all mysql db success`);
    }
};


/**
 * 封装新的db query 操作；
 */
global.dbQuery = (sql, params, dbName = 'game') => {
    return new Promise((resolve, reject) => {
        global.mysql[dbName].getConnection((err, conn) => {
            if (err) {
                common.error('mysql'+err);
                reject(dbName + " 从连接池获取连接失败");
            } else {
                let q = conn.query(sql, params, (qerr, vals, fields) => {
                    if (qerr) {
                        common.error('mysql'+qerr);
                        reject("数据库 QUERY 失败");
                    } else {
                        resolve(vals);
                    }
                    conn.release();
                });
                common.log('mysql查询语句:'+q.sql);
            }
        });
    });
};



