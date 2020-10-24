
// 游戏ID
const PRE = 'express';

// 环境变量
const envType = 'DEV';

// REDIS前缀
const prefix = `${PRE}:${envType}`;

module.exports = {
    // 未满桌子列表 带权重列表
    USER_INFO:`${prefix}:notFullTables:`,

};
