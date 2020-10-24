'use strict';

var express = require('express');
var router = express.Router();
var User = require('../controller/site/user');

//登陆界面
router.get('/',User.login);
//登陆处理
router.post('/login',User.postLogin);
//注册界面
router.get('/register',User.register);
//注册处理
router.post('/register',User.postRegister);
//退出处理
router.get('/logout',User.logout);

module.exports  = router;
