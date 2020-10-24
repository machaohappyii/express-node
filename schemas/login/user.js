var mongoose = require('mongoose');

//用户表
var userSchema = mongoose.Schema({
    user_name: String, //用户名
    pass: String, //密码
    last_update_time: Date, //最后更新日期
});
module.exports.userSchema = userSchema;


