var mongoose = require('mongoose');
var userSchemas = require('./login/user');

//用户表
var  userTable = mongoose.model('user', userSchemas.userSchema);
module.exports.userTable = userTable;
