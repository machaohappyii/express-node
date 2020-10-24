'use strict';
var rconfig = require('../config/redis');
let ioredis = require('ioredis');
var colors = require('colors');

exports.init = () => {
    let redisUrl = rconfig[global.ENV];
    //redis 连接
    global.redis = new ioredis(redisUrl);
    redis.on('error', error => {
        console.log(`Load Redis err ${error.stack}`);
    });

    redis.on('ready', () => {
        console.log(`Load Redis ${colors.green(redisUrl.host+':'+redisUrl.port)} success`);
    });

    //屏蔽redis命令
    redis.keys = redis.KEYS = redis.flushall = redis.FLUSHALL = redis.flushdb = redis.FLUSHDB = () => {
        return false;
    };
};



