var router = require('../../routes/index');
var colors = require('colors');
var http = require('http');
var config = require('../config/config');
var common = require('../../lib/common');

exports.init = (app) => {

    // 路由请求超时的中间件
    app.use(function (req, res, next) {
        // 这里必须是Response响应的定时器【120秒】
        res.setTimeout(config.timeOut, function () {
            common.warn("hhtp Request has timed out.");
            return res.status(408).send("请求超时")
        });
        next();
    });

    //路由设置
    router(app);

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        res.status(404);
        res.render('404', {
            title: '404: File Not Found'
        });
    });

    // error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};
        common.error(err);
        res.status(err.status || 500);
        res.render('error');
    });


    // 捕获可以让系统崩溃的错误，避免进程反复重启
    process.on('uncaughtException', function (err) {
        err.name = "UncaughtExceptionError";
        common.error('Caught exception: ' + err.stack);
    });

    var port = config.port || '3000';
    app.set('port', port);


    setTimeout(function () {
        // 启动服务器
        var server = http.createServer(app).listen(app.get('port'), function () {
            var env_msg =  colors.green(config.env);
            console.log(`http server is listening on port ${colors.green(app.get('port'))} in ${env_msg} mode.`);
        }).on('close', function () {
            console.log(colors.red('terminating server'));
        });
    },500)
};




