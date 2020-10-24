var redis    = module.exports = exports = {};
var conf = require('./constants');


var isWriteLog  = conf.REDIS_LOG || 0;
function writeLog(msg){
    if(1 == isWriteLog){
        console.log(msg);
    }
}

redis.set = function(key, value, time){
    time = time || -1;
    writeLog("设置 REDIS KEY："     + key);
    writeLog("设置 REDIS VALUE："   + value);
    writeLog("设置 REDIS TIME："    + time);

    return global.redis.set(key, value, function (err, replay){
        if (err){
            writeLog("设置 REDIS KEY " + key + " 失败，" + err);
            writeLog(replay);
        }else{
            if (-1 != time){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("设置 REDIS KEY " + key + " 结果：" + replay);
        }
    });
};

redis.get = function(key){
    return global.redis.get(key, function (err, replay) {
        if(err){
            writeLog("查询 REDIS KEY " + key + " 失败：" + err);
        }else{
            writeLog("查询 REDIS KEY " + key + " 结果：" + replay);
        }
    });
};

redis.hset = function(key, domain, value, time){
    time = time || -1;
    writeLog("设置 REDIS KEY："     + key);
    writeLog("设置 REDIS DOMAIN："  + domain);
    writeLog("设置 REDIS VALUE："   + value);
    writeLog("设置 REDIS time："    + time);

    return global.redis.hset(key, domain, value, function (err, replay) {
        if(err){
            writeLog("设置 REDIS KEY " + key + " 失败，" + err);
            writeLog(replay);
        }else{
            if(-1 != time){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("设置 REDIS KEY " + key + " 结果：" + replay);
        }
    });
};

redis.hget = function(key, domain){
    return global.redis.hget(key, domain, function (err, replay) {
        if(err){
            writeLog("查询 REDIS KEY：" + key + " DOMAIN：" + domain + " 失败：" + err);
        }else{
            writeLog("查询 REDIS KEY：" + key + " DOMAIN：" + domain + " 结果：" + replay);
        }
    });
};

redis.hdel = function(key, domain){
    writeLog("删除 REDIS KEY："     + key);
    writeLog("删除 REDIS DOMAIN："  + domain);

    return global.redis.hdel(key, domain, function (err, replay) {
        if(err){
            writeLog("删除 REDIS KEY：" + key + " DOMAIN：" + domain + " 失败：" + err);
        }else{
            writeLog("删除 REDIS KEY：" + key + " DOMAIN：" + domain + " 结果：" + replay);
        }
    });
};

redis.hlen = function(key){
    writeLog("查询 REDIS KEY："     + key);

    return global.redis.hlen(key, function (err, replay) {
        if(err){
            writeLog("查询 REDIS KEY：" + key  + " 失败：" + err);
        }else{
            writeLog("查询 REDIS KEY：" + key  + " 结果：" + replay);
        }
    });
};

redis.hsetnx = function(key, domain, content, time){
    time = time || -1;
    writeLog("设置 REDIS HSETNX KEY："     + key);
    writeLog("设置 REDIS HSETNX DOMAIN："  + domain);
    writeLog("设置 REDIS HSETNX TIME："    + time);

    return global.redis.hsetnx(key, domain, content, function (err, replay) {
        if(err){
            writeLog("设置 REDIS HSETNX KEY：" + key + " 失败：" + err);
        }else if(replay == 0){
            writeLog("设置 REDIS HSETNX KEY：" + key + " 失败：值已经存在");
        }else{
            if(-1 != time){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("设置 REDIS HSETNX KEY：" + key + " 结果：" + replay);
        }
    });
};

redis.hmset = function(key, value, time){
    time = time || -1;
    writeLog("设置 REDIS KEY："    + key);
    writeLog("设置 REDIS VALUE："  + JSON.stringify(value));
    writeLog("设置 REDIS time："   + time);

    return global.redis.hmset(key, value, function (err, replay) {
        if(err){
            writeLog("设置 REDIS ALL 结果：失败：" + err);
        }else{
            if(-1 != time){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("设置 REDIS 结果：" + replay);
        }
    });
};

redis.hgetall = function(key){
    return global.redis.hgetall(key, function (err, replay) {
        if(err){
            writeLog("查询 REDIS ALL KEY：" + key + "失败：" + err);
        }else{
            writeLog("查询 REDIS ALL KEY：" + key + "结果：" + JSON.stringify(replay));
        }
    });
};

redis.setnx = function(key, time){
    time = time || -1;
    writeLog("设置 REDIS NX KEY："     + key);
    writeLog("设置 REDIS NX TIME："    + time);

    return global.redis.setnx(key, "lock", function (err, replay) {
        if(err){
            writeLog("设置 REDIS NX KEY：" + key + " 失败：" + err);
        }else if(replay == 0){
            writeLog("设置 REDIS NX KEY：" + key + "失败：值已经存在");
        }else{
            if(-1 != time){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("设置 REDIS NX KEY：" + key + "结果：" + replay);
        }
    });
};

redis.del = function(key){
    return global.redis.del(key, function (err, replay) {
        if(err){
            writeLog("删除 REDIS KEY：" + key + " 失败：" + err);
        }else{
            writeLog("删除 REDIS KEY：" + key + " 结果：" + replay);
        }
    });
};

redis.zrange = function(key, start, end){
    writeLog("查询有序集 REDIS KEY："     + key);
    writeLog("查询有序集 REDIS START"     + start);
    writeLog("查询有序集 REDIS END"       + end);

    return global.redis.zrange(key, start||0, end||0, "WITHSCORES", function (err, replay) {
        if(err){
            writeLog("查询有序集 REDIS 结果：失败：" + err);
        }else{
            writeLog("查询有序集 REDIS 结果：" + replay);
        }
    });
};



//ZREVRANGE
redis.zrevrange = function(key, start, end){
    writeLog("查询有序集 从大到小 REDIS KEY："     + key);
    writeLog("查询有序集 从大到小 REDIS START"     + start);
    writeLog("查询有序集 从大到小 REDIS END"       + end);

    return global.redis.zrevrange(key, start||0, end||0, function (err, replay) {
        if(err){
            writeLog("查询有序集 从大到小 REDIS 结果：失败：" + err);
        }else{
            writeLog("查询有序集 从大到小 REDIS 结果：" + replay);
        }
    });
};


//ZREVRANGE 权重值一起返回
redis.zrevrangewithscores = function(key, start, end){
    writeLog("查询有序集 从大到小 REDIS KEY："     + key);
    writeLog("查询有序集 从大到小 REDIS START"     + start);
    writeLog("查询有序集 从大到小 REDIS END"       + end);

    return global.redis.zrevrange(key, start||0, end||0, "WITHSCORES", function (err, replay) {
        if(err){
            writeLog("查询有序集 从大到小 REDIS 结果：失败：" + err);
        }else{
            writeLog("查询有序集 从大到小 REDIS 结果：" + replay);
        }
    });
};


//ZINCRBY
redis.zincrby = function(key, domain, value, time){
    time = time || -1;
    writeLog("增加有序集 REDIS KEY："     + key);
    writeLog("增加有序集 REDIS DOMAIN："  + domain);
    writeLog("增加有序集 REDIS VALUE："   + value);
    writeLog("增加有序集 REDIS TIME："    + time);

    return global.redis.zincrby(key, value||0, domain, function (err, replay) {
        if(err){
            writeLog("增加有序集 REDIS 结果：失败：" + err);
        }else{
            if(-1 != time){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("增加有序集 REDIS 结果：" + replay);
        }
    });
};

//ZREM
redis.zrem = function(key, domain){
    writeLog("删除有序集 REDIS KEY："     + key);
    writeLog("删除有序集 REDIS DOMAIN："  + domain);

    return global.redis.zrem(key, domain, function (err, replay) {
        if(err){
            writeLog("删除有序集 REDIS 结果：失败：" + err);
        }else{
            writeLog("删除有序集 REDIS 结果：" + replay);
        }
    });
};

//zadd
redis.zadd = function(key, domain, value, time){
    time = time || -1;
    writeLog("增加有序集 REDIS KEY："     + key);
    writeLog("增加有序集 REDIS DOMAIN："  + domain);
    writeLog("增加有序集 REDIS VALUE："   + value);
    writeLog("增加有序集 REDIS TIME："    + time);

    return global.redis.zadd(key, value||0, domain, function (err, replay) {
        if(err){
            writeLog("增加有序集 REDIS 结果：失败：" + err);
        }else{
            if(-1 != time){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("增加有序集 REDIS 结果：" + replay);
        }
    });
};

redis.hincrby = function(key, domain, value, time){
    time = time || -1;
    writeLog("增加HASH域 REDIS KEY："     + key);
    writeLog("增加HASH域 REDIS DOMAIN："  + domain);
    writeLog("增加HASH域 REDIS VALUE："   + value);
    writeLog("增加HASH域 REDIS TIME："    + time);

    return global.redis.hincrby(key, domain, value||0,  function (err, replay) {
        if(err){
            writeLog("增加HASH域 REDIS 结果：失败：" + err);
        }else{
            if(-1 != time){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("增加HASH域 REDIS 结果：" + replay);
        }
    });
};

redis.incrby = function(key, value, time){
    time = time || -1;
    writeLog("增加 REDIS KEY："     + key);
    writeLog("增加 REDIS VALUE："   + value);
    writeLog("增加 REDIS TIME："    + time);

    return global.redis.incrby(key, value||0,  function (err, replay) {
        if(err){
            writeLog("增加 REDIS 结果：失败：" + err);
        }else{
            if(time != -1){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("增加 REDIS 结果：" + replay);
        }
    });
};

redis.incr = function(key, time){
    time = time || -1;
    writeLog("增加 REDIS KEY："     + key);
    writeLog("增加 REDIS TIME："    + time);

    return global.redis.incr(key,  function (err, replay) {
        if(err){
            writeLog("增加 REDIS 结果：失败：" + err);
        }else{
            if(time != -1){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("增加 REDIS 结果：" + replay);
        }
    });
};

redis.decrby = function(key, value, time){
    time = time || -1;
    writeLog("减少 REDIS KEY："     + key);
    writeLog("减少 REDIS VALUE："   + value);
    writeLog("减少 REDIS TIME："    + time);

    return global.redis.decrby(key, value||0,  function (err, replay) {
        if(err){
            writeLog("减少 REDIS 结果：失败：" + err);
        }else{
            if(time != -1){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("减少 REDIS 结果：" + replay);
        }
    });
};

redis.decr = function(key, time){
    time = time || -1;
    writeLog("更改 REDIS KEY："     + key);
    writeLog("更改 REDIS TIME："    + time);

    return global.redis.decr(key,  function (err, replay) {
        if(err){
            writeLog("更改 REDIS 结果：失败：" + err);
        }else{
            if(time != -1){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("更改 REDIS 结果：" + replay);
        }
    });
};

redis.lpush = function(key, value, time){
    time = time || -1;
    writeLog("增加LIST REDIS KEY："     + key);
    writeLog("增加LIST REDIS VALUE："   + value);
    writeLog("增加LIST REDIS TIME："    + time);

    return global.redis.lpush(key, value, function (err, replay) {
        if(err){
            writeLog("增加LIST 结果：失败：" + err);
        }else{
            if(time != -1){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("增加LIST 结果：" + replay);
        }
    });
};

redis.rpush = function(key, value, time){
    time = time || -1;
    writeLog("增加LIST REDIS KEY："     + key);
    writeLog("增加LIST REDIS VALUE："   + value);
    writeLog("增加LIST REDIS TIME："    + time);

    return global.redis.rpush(key, value, function (err, replay) {
        if(err){
            writeLog("增加LIST 结果：失败：" + err);
        }else{
            if(time != -1){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("增加LIST 结果：" + replay);
        }
    });
};

redis.rpop = function(key){
    return global.redis.rpop(key, function (err, replay) {
        if (err){
            writeLog("RPOP移除LIST 结果：失败：" + err);
        }else{
            writeLog("RPOP移除LIST 结果：" + replay);
        }
    });
};

redis.lrange = function(key, start, end){
    writeLog("查询有序集 REDIS KEY："     + key);
    writeLog("查询有序集 REDIS START"     + start);
    writeLog("查询有序集 REDIS END"       + end);

    return global.redis.lrange(key, start||0, end||-1, function (err, replay) {
        if(err){
            writeLog("查询有序集 REDIS 结果：失败：" + err);
        }else{
            writeLog("查询有序集 REDIS 结果：" + replay);
        }
    });
};

redis.lindex = function(key, domain){
    writeLog("查询 REDIS KEY："     + key);
    writeLog("查询 REDIS DOMAIN："  + domain);

    return global.redis.lindex(key, domain, function (err, replay) {
        if(err){
            writeLog("查询 REDIS 结果：失败：" + err);
        }else{
            writeLog("查询 REDIS 结果：" + replay);
        }
    });
};

redis.lrem = function(key, value, num){
    writeLog("删除LIST中的值 REDIS KEY："     + key);
    writeLog("删除LIST中的值 REDIS VALUE"     + value);
    writeLog("删除LIST中的值 REDIS NUM"       + num);

    return global.redis.lrem(key, num||0, value, function (err, replay) {
        if(err){
            writeLog("删除LIST中的值 REDIS 结果：失败：" + err);
        }else{
            writeLog("删除LIST中的值 REDIS 结果：" + replay);
        }
    });
};

redis.llen = function(key){
    writeLog("查询LIST中的长度 REDIS KEY："     + key);

    return global.redis.llen(key, function (err, replay) {
        if(err){
            writeLog("查询LIST中的长度 REDIS 结果：失败：" + err);
        }else{
            writeLog("查询LIST中的长度 REDIS 结果：" + replay);
        }
    });
};

redis.lpop = function(key){
    writeLog("弹出一个LIST值 REDIS KEY："     + key);

    return global.redis.lpop(key, function (err, replay) {
        if(err){
            writeLog("弹出一个LIST值 REDIS 结果：失败：" + err);
        }else{
            writeLog("弹出一个LIST值 REDIS 结果：" + replay);
        }
    });
};

redis.spop = function(key){
    writeLog("弹出一个SET值 REDIS KEY："     + key);

    return global.redis.spop(key, function (err, replay) {
        if(err){
            writeLog("弹出一个SET值 REDIS 结果：失败：" + err);
        }else{
            writeLog("弹出一个SET值 REDIS 结果：" + replay);
        }
    });
};

redis.expireat = function(key,time){
    writeLog("定时过期 REDIS KEY："   + key);
    writeLog("定时过期 REDIS TIME："  + time);

    return global.redis.expireat(key, time, function (err, replay) {
        if(err){
            writeLog("定时过期 REDIS 结果：失败：" + err);
        }else{
            writeLog("定时过期 REDIS 结果：" + replay);
        }
    });
};

redis.exists = function(key){
    writeLog("查询KEY是否存在：" + key);

    return global.redis.exists(key, function (err, replay) {
        if(err){
            writeLog(err);
            writeLog(replay);
        }else{
            writeLog("查询KEY是否存在 结果：" + replay);
        }
    });
};

redis.rename = function(key,newKey){
    writeLog("重命名 REDIS KEY："     + key);

    return global.redis.rename(key,newKey, function (err, replay) {
        if(err){
            writeLog(err);
            writeLog(replay);
        }else{
            writeLog("重命名 REDIS 结果：" + replay);
        }
    });
};

redis.gAppend = function(key, value, time){
    time = time || -1;
    writeLog("追加 REDIS KEY："     + key);
    writeLog("追加 REDIS VALUE："   + value);
    writeLog("追加 REDIS TIME："    + time);

    return global.redis.gAppend(key, value, function (err, replay) {
        if(err){
            writeLog("追加 结果：失败：" + err);
        }else{
            if(time != -1){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("追加 结果：" + replay);
        }
    });
};

redis.sadd = function(key, value, time){
    time = time || -1;
    writeLog("增加无序集 REDIS KEY："     + key);
    writeLog("增加无序集 REDIS VALUE："   + value);
    writeLog("增加无序集 REDIS TIME："    + time);

    return global.redis.sadd(key, value||0, function (err, replay) {
        if(err){
            writeLog("增加无序集 REDIS 结果：失败：" + err);
        }else{
            if(-1 != time){
                global.redis.expire(key, time, function(err2, replay2){});
            }
            writeLog("增加无序集 REDIS 结果：" + replay);
        }
    });
};

redis.srem = function(key, value){
    writeLog("删除无序集 REDIS KEY："     + key);
    writeLog("删除无序集 REDIS VALUE："     + value);

    return global.redis.srem(key, value, function (err, replay) {
        if(err){
            writeLog("增加无序集 REDIS 结果：失败：" + err);
        }else{
            writeLog("增加无序集 REDIS 结果：" + replay);
        }
    });
};

redis.scard = function(key){
    writeLog("无序结数量 REDIS KEY："     + key);

    return global.redis.scard(key, function (err, replay) {
        if(err){
            writeLog("无序结数量 REDIS 结果：失败：" + err);
        }else{
            writeLog("返回无序集数量 REDIS 结果：" + replay);
        }
    });
};

redis.smembers = function(key){
    writeLog("返回无序集成员 REDIS KEY："     + key);

    return global.redis.smembers(key, function (err, replay) {
        if(err){
            writeLog("返回无序集成员 REDIS 结果：失败：" + err);
        }else{
            writeLog("返回无序集成员 REDIS 结果：" + replay);
        }
    });
};


/*
 * SISMEMBER
 * 判断参数中指定成员是否已经存在于与Key相关联的Set集合中。
 */
redis.sismember = function(key, value){
    writeLog("返回无序集成员 REDIS KEY："     + key);
    writeLog("返回无序集成员 REDIS VALUE"     + value);

    return global.redis.sismember(key, value, function (err, replay) {
        if(err){
            writeLog("判断无序集成员 REDIS 结果：失败：" + err);
        }else{
            writeLog("判断无序集成员 REDIS 结果：" + replay);
        }
    });
};

//zrangebyscore
redis.zrangebyscore = function(key, min, max){
    writeLog("返回有序集key中，所有score值介于min和max之间(包括等于min或max)的成员 REDIS KEY：" + key);
    writeLog("返回有序集key中，所有score值介于min和max之间(包括等于min或max)的成员 REDIS MIN"   + min);
    writeLog("返回有序集key中，所有score值介于min和max之间(包括等于min或max)的成员 REDIS MAX"   + max);

    return global.redis.zrangebyscore(key, min||"-inf", max||"+inf", "WITHSCORES", function (err, replay) {
        if(err){
            writeLog("返回有序集key中，所有score值介于min和max之间(包括等于min或max)的成员 REDIS 结果：失败：" + err);
        }else{
            writeLog("返回有序集key中，所有score值介于min和max之间(包括等于min或max)的成员 REDIS 结果：" + replay);
        }
    });
};

//ZSCORE
redis.zscore = function(key, domain){
    writeLog("返回有序集key中,成员member的score值 REDIS KEY："     + key);
    writeLog("返回有序集key中,成员member的score值 REDIS domain"    + domain);

    return global.redis.zscore(key, domain, function (err, replay) {
        if(err){
            writeLog("返回有序集key中,成员member的score值 REDIS 结果：失败：" + err);
        }else{
            writeLog("返回有序集key中,成员member的score值 REDIS 结果：" + replay);
        }
    });
};
