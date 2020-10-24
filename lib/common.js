const _      = require('lodash');
// const moment = require('moment');
const path   = require('path');

/**
 * 帮助类基础类
 */
class common {
    constructor() {
        // this.errorConfig = require('./error');
        // this.cmdConfig   = require('./cmd');
        // moment.locale('en', {week: {dow: 7}});
    }


    log(data,method) {//info 类型日志
        privateLog(data, '<info>',method);
    }


    debug(data,method) {//debug 类型日志
        privateLog(data, '<debug>',method);
    }

    warn(data,method) {//warn 类型日志
        privateLog(data, '<warn>',method);
    }

    error(data, method) {//error 类型日志
        privateLog(data, '<error>', method);
    }

    /**
     * 获取函数具体信息
     * @returns {{}}
     */
    getFileInfo() {
        let stackReg  = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
        let stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
        let stacklist = (new Error()).stack.split('\n').slice(3);
        let s         = stacklist[0];
        let sp        = stackReg.exec(s) || stackReg2.exec(s);
        let data      = {};
        if (sp && sp.length === 5) {
            data.method = sp[1];
            data.path   = sp[2];
            data.line   = sp[3];
            data.pos    = sp[4];
            data.file   = path.basename(data.path);
            data.class  = path.basename(data.path,'.js');
        }
        return data;
    }

    /**
     * 获取函数类的方法名称
     * @returns {*}
     */
    getMethod() {
        let info = this.getFileInfo();
        return  _.get(info,'class')+'.'+info['method'];
    }



    /**
     * 计算某个值是否存在于数组中
     * @param arrays    数组
     * @param needle   打出的牌
     * @return false:不存在, true:存在
     */
    inArray(arrays, needle) {
        let status = false;
        for (let index in arrays) {
            if (arrays[index] == needle) {
                status = true;
                break;
            }
        }

        return status;
    }



    /**
     * 检测在区间范围内
     * @param val
     * @param arr
     * @returns {boolean}
     */
    inRange(val, arr) {
        let start = arr[0];
        let end = arr[1];
        let rel = false;
        if (val >= start && val <= end) {
            rel = true;
        }
        return rel;
    }


    /**
     * 小写数组转大写
     * @param n    11  string格式
     * @returns  一十一
     */
    numConvert(n) {
        if(!/(^[1-9]\d*$)/){
            return '非法数字';
        }
        var uppercase='千百亿千百十万千百十个';
        var nLength=n.length;
        var newStr='';
        if(uppercase.length-nLength<0){
            return '数字过长';
        }
        uppercase=uppercase.substr(uppercase.length-nLength);
        for(var i=0;i<nLength;i++){
            newStr +=' 一二三四五六七八九'.charAt(n[i])+uppercase.charAt(i);
        };
        newStr=newStr.substr(0,newStr.length-1);
        newStr =newStr.replace('一十', '十');
        newStr = newStr.trim();
        return newStr;
    };



}

module.exports = new common();

/**
 * 记录日志
 * @param data
 * @param prefix 日志前缀标识
 * @param pMethod
 * @private 私有方法禁止外部调用
 */
function privateLog(data, prefix, pMethod) {
    // 自定义一个内部方法
    let writeLog = function (prefix, method, content) {
        // 预发，生产日志记录方式采用：log4j
        let full = prefix + ' ';
        full += method ? method + ' ' : '';
        full += content;
        if (prefix == '<info>') {
            global.logger.info(full);
            console.log('');
        }else if(prefix == '<debug>'){
            global.logger.debug(full);
            console.log('');
        }else if(prefix == '<warn>'){
            global.logger.warn(full);
            console.log('');
        } else {
            global.logger.error(full);
        }
    };
    // 自定义一个内部方法
    let writeEmptyLine = function (content) {
        global.logger.info(content);
    };
    // 输出空行
    if (data === '') {
        writeEmptyLine('');
        return false;
    }
    let content = '';
    let method = _.get(data, 'method', '');
    if (_.isObject(data)) {
        let pid = _.get(data, 'pid', 0);
        let roomId = _.get(data, 'roomId', 0);
        let roundId = _.get(data, 'roundId', 0);
        let userId = _.get(data, 'userId', 0);
        let msg = _.get(data, 'msg', '');
        _.unset(data, 'method');
        _.unset(data, 'roundId');
        _.unset(data, 'userId');
        _.unset(data, 'msg');
        // 日志核心参数
        if(pid) content += 'pid:' + pid + ',';
        if (roomId) content += 'roomId:' + roomId + ',';
        if (roundId) content += 'roundId:' + roundId + ",";
        if (userId) content += 'userId:' + userId + ',';
        // 其余参数
        if (data) {
            _.map(data, function (val, index) {
                if (!_.isString(val)) val = JSON.stringify(val);
                content += index + ":" + val + ",";
            });
        }
        // 备注信息放在最后
        if (msg) content += 'msg:' + msg + ',';
        content = _.trimEnd(content, ',');
    } else if (_.isArray(data)) {
        content = JSON.stringify(data);
    } else {
        content = data;
    }
    // 错误类对象特殊处理
    if (data instanceof Error) content = data.stack;
    // 优先采用传递方法名称
    if (pMethod) method = pMethod;
    // 组合方法名称
    method = method ? '<' + method + '>' : '';
    writeLog(prefix, method, content);
}