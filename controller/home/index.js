'use strict';

class home {
    //登陆
    async index(req, res, next){
        res.render('home/index',{layout:'main',title:'xiaoma'})
    }
}
module.exports = new home();