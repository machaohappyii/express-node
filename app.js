'use strict';
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore  = require("connect-mongo")(session);
var logger = require('morgan');
var ejs = require('ejs');
var partials = require('express-partials');
var http = require('./module/http/http');
var dbInit = require('./module/db/db_init');
var log = require('./module/log/log');
var config = require('./module/config/config');

//环境变量配置
global.ENV = config.env;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html',ejs.__express);
app.set('view engine', 'html');
app.use(partials());//模板layout

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
//配置中间件
app.use(session({
  secret: 'node-express-yyy',   // 可以随便写。 一个 String 类型的字符串，作为服务器端生成 session 的签名
  name:'node-express-id',/*保存在本地cookie的一个名字 默认connect.sid  可以不设置*/
  resave: false,   /*强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。*/
  saveUninitialized: true,   //强制将未初始化的 session 存储。  默认值是true  建议设置成true
  cookie: {
    maxAge:1000*30*60,    /*过期时间*/
    httpOnly: true,//true 那么通过js脚本将无法读取到cookie信息
    secure:   false,//secure https这样的情况才可以访问cookie
  },
  rolling:true,//在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false）
  store:new MongoStore({
    url: 'mongodb://127.0.0.1:27017/shop',  //数据库的地址
   // touchAfter: 24 * 3600   //time period in seconds  通过这样做，设置touchAfter:24 * 3600，您在24小时内只更新一次会话，不管有多少请求(除了在会话数据上更改某些内容的除外)
  })
}));

//日志处理
log.init();
//处理db连接
dbInit.init();
//http服务
http.init(app);

// async function test(){
//   let sql = 'SELECT u.id uid, u.nick_name nickName, u.name, u.avatar, u.visitor, u.type uType, um.money, u.channel_id, u.pre_uid FROM `user` u LEFT JOIN user_money um ON u.id=um.user_id WHERE u.id=? LIMIT 1';
//   let userInfo = await global.dbQuery(sql, [1006], 'platform');
//   console.log('userInfo-->',userInfo[0].uid)
// }
// test()
// module.exports = app;
