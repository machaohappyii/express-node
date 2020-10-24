'use strict';
var _ = require('lodash');
var UserTable = require('../../schemas/index').userTable;
var common = require('../../lib/common');
var UserModel = require('../../models/userModel');
class user {
    //登陆界面
    async login(req, res, next){
        res.render('site/login',{layout:'main',title:'xiaoma'})
    }

    //登陆处理
    async postLogin(req, res, next){
        let method = common.getMethod();
        let {user_name,pass} = req.body;
        if(!user_name || !pass){
           return res.json({code:500,msg:'参数错误'});
        }
        //查找用户数据
        let userInfo = await UserTable.findOne({user_name:user_name,pass:pass});
        common.log({method,userInfo});
        if(!_.isEmpty(userInfo)){
            req.session.user_id = userInfo._id;
            req.session.user_name = user_name;
            return res.json({code:200, userInfo:userInfo})
        }
        res.json({code:500, msg:'登陆信息错误'});
    }

    //注册
    async register(req, res, next){
        res.render('site/register',{layout:'main',title:'xiaoma'})
    }

    //注册处理
    async postRegister(req, res, next){
        let {user_name,pass,sub_pass} = req.body;
        if(!user_name || !pass || !sub_pass){
           return res.json({code:500,msg:'参数错误'});
        }
        if(pass !=sub_pass){
            return res.json({code:500,msg:'2次密码不一致'});
        }
        //查找用户数据
        let userInfo = await UserTable.findOne({user_name:user_name});
        if(!_.isEmpty(userInfo)){
            return res.json({code:500, msg:'用户已注册'})
        }
        //没有就添加
        let rel = await UserTable.create({user_name:user_name,pass:pass});
        res.json({code:200, userInfo:rel});
    }

    //退出处理
    async logout(req, res, next){
        req.session.user_name = null;
        req.session.user_id = null;

        req.session.destroy(function (err) {
            if(err){
                console.log(err)
            }else{
                res.redirect('/site')
            }
        });
    }


}
module.exports = new user();