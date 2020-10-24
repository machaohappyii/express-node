'use strict';

var express = require('express');
var router = express.Router();
var Home = require('../controller/home/index');

//首页处理
router.get('/',Home.index);
module.exports  = router;
