'use strict';
var mgconfig = require('../config/mongo');
var mongoose = require('mongoose');
var colors = require('colors');

exports.init = () => {
    let mongoUrl = mgconfig[global.ENV];
    //连接mongodb
    mongoose.connect(mongoUrl, {useNewUrlParser:true,useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on('open' ,() => {
        console.log(`Load mongodb: ${colors.green(mongoUrl)} success`);
    });

    db.on('error', function(error) {
        console.log(`Error in MongoDb connection:`+error);
        mongoose.disconnect();
    });

    db.on('close', function() {
        console.log(`mongodb数据库断开，重新连接数据库`);
        mongoose.connect(config.url, {server:{auto_reconnect:true}});
    });
};





// export default db;
