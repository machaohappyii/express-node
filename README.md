#express-node框架

## 使用介绍
> 技术栈: nodejs + express + mongodb + mongoose+ mysql +reids

```javascript
    1. node(8.0+)
    2. mongodb
    3. redis 
    4. mysql 
    注：module/config/config.js 配置是否开启 db 服务
```

> 运行服务

```javascript
    npm install (安装 node_modules)
    node app.js (启动服务)
```


### 配置文件
>路径： module/config/config.js

```javascript
module.exports = exports = {
    "env":"DEV", //环境变量
    "port":3000, //http服务端口
    "mysql":true,//是否连接数据库
    "redis":true,//是否连接redis
    "mongo":true,//是否连接mongodb
    "timeOut":10*1000,//请求http超时时间
};
```



### 目录说明
```javascript
  |-- module 逻辑层
    |--config 配置文件
        |--config.js  启动服务的配置文件
        |--mongo.js   mongodb的配置文件
        |--mysql.js   mysql的配置文件
        |--redis.js   redis的配置文件
    |--db    数据库连接
        |--db_init.js  启动服务的db处理
        |--mongodb.js  mongodb的连接处理
        |--mysql.js    mysql的的连接处理
        |--redis.js    redis的的连接处理
    |--http  http服务
        |--http.js http服务启动处理
    |--log logs日志文件
        |--log.js 日志文件处理
  |-- routes 路由处理
    |--index.js 路由入口
  |-- contrller 逻辑层
    |--...
  |-- models 数据库与redis操作
    |--...
  |-- schemas mongodb 的 schemas
    |--... 
  |-- libs 通用模块
    |-- common.js 编辑的公共方法
    |-- constants.js  常亮配置
    |-- redis.js redis的方法封装层
    |-- rediskeys.js redis的key配置
  |-- public css js 等静态文件
    |--...
  |-- views html 等静态文件
    |--...
  |-- log 日志文件夹
  |-- README.MD 帮助文档等
  |-- package.json 项目描述及第三方modules文件
  |-- app.js 主入口文件

```

### nginx 代理配置
```javascript
 server {
        listen       80;
        server_name   express.com;	
        location / {
             # First attempt to serve request as file, then
             # as directory, then fall back to displaying a 404.
             proxy_pass http://127.0.0.1:3000;   #node 服务端口号
             proxy_set_header Host $host;
             proxy_set_header X-Real-IP $remote_addr;
             proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

          }
    }
```

> 浏览器访问 http://express.com  即可