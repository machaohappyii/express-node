'use strict';
var _ = require('lodash');
var site = require('./site');
var home = require('./home');
var common = require('../lib/common');
module.exports = function (app) {
  //校验登陆
  app.use(function (req,res,next) {
    common.log({method:'index.'+req.url,msg:`请求参数:${JSON.stringify({body:req.body,query:req.query})}`});
    let needContro = ['/site','/site/register','/site/login'];
    if ((!req.session.user_id || !req.session.user_name)  && _.indexOf(needContro,req.url)==-1) {
        res.redirect('/site');
    } else {
        next();
    }
  });

  //登陆处理
  app.use('/site', site);
  //首页
  app.use('/home', home);
};
