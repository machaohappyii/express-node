const REDISKEYS = require('./rediskeys');

module.exports = {
    // REDIS键名
    REDISKEYS,
    UPDATE_USER_INFO_TIME : 43200, // 更新用户信息锁过期时间 12小时
    REDISKEYS_DEFAULT_TIME:14 * 24 * 60 * 60,
    // 房间号失效时间 2天
    ROOMNO_EXPIRE_TIME: 172800,
    REDIS_LOG :1,


    // 数据库操作类型
    DBA_SELECT: 1,
    DBA_INSERT: 2,
    DBA_UPDATE: 3,

    // 超时常量配置 毫秒
    TIME_OUT_AGREE_DISSOLVE_ROOM : 120,//超时同意解散房间 120s
    TIMEOUT_DISSOLVE_ROOM  : 2 * 60 * 60 * 1000, //房间超时2小时未活动 解散房间
    TIMEOUT_CHECK_ROOM  : 10 * 60 * 1000,       //每10分钟检测一下房间活动
    COMPLETE_DISSROOM_RESET_TIME:24 * 60 * 60 + 35 * 60,//需结算走结算解散房间 回收时间
    NOCOMPLETE_DISSROOM_RESET_TIME: 5 * 60,//直接解散房间



    // 状态码
    SUCCESS_CODE: 200, // 返回客户端成功code
    ERROR_CODE  : -1, // 返回客户端失败code

    // 特殊常量配置
    DEBUG                 : 0, // 是否启用调试模式，0：关闭，1：开启
    // CDN_HOST       : gApp.config.CDN_HOST,//图片地址
};