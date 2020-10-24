var mysql =require('./mysql');
var redis =require('./redis');
var mongodb =require('./mongodb');
var config = require('../config/config');

exports.init = () => {
    //db连接
    if(config.mysql){
        mysql.init();
    }
    if(config.redis){
        redis.init();
    }
    if(config.mongo){
        mongodb.init();
    }
};

