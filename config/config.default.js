'use strict';
const path = require('path');

module.exports = appInfo => {
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1537868411848_2841';
    // 添加 view 配置
    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        },
    };
    // 新闻配置项
    config.news = {
        pageSize: 5,
        serverUrl: 'https://news.ycombinator.com/',
    };

    config.name = 'CNode技术社区';

    config.host = 'http://cnodejs.org';

    // 版块
    config.tabs = [[ 'share', '分享' ], [ 'ask', '问答' ], [ 'job', '招聘' ]];

    config.session_secrect = 'node_club_secret';

    // database
    config.redis = {
        client: {
            host: process.env.EGG_REDIS_HOST || '127.0.0.1',
            port: process.env.EGG_REDIS_PORT || 6379,
            password: process.env.EGG_REDIS_PASSWORD || '',
            db: process.env.EGG_REDIS_DB || '0',
        },
    };
    config.mongoose = {
        url: process.env.EGG_MONGODB_URL || 'mongodb://localhost:27017/egg_cnode',
        poolSize: 20,
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
    };
    // 上传
    config.upload = {
        path: path.join(__dirname,'../app/public/upload'),
        url: '/public/upload/',
    };
    config.multipart = {
        mode: 'stream',    //file stream
    };
    // 默认主题显示数量
    config.list_topic_count = 20;

    // 站内搜索
    config.search = 'local'; // 'google', 'baidu', 'local'

    // add your config here
    config.middleware = ['robot'];
    config.robot = {
        ua: [
            /Baiduspider/i,
        ],
    };

    // 安全控制
    config.security = {
        csrf: false,
        ctoken: false,
    };

    // 默认返回形式
    config.ret = {
        code: -1,
        data: [],
        message: '',
    }

    // 邮箱配置
    config.mailOptions = {
        host: 'smtp.163.com',
        port: 465,
        auth: {
            user: 'xuhui5018@163.com',
            pass: 'wy294792',
        },
        ignoreTLS: true,
    };

    return config;
}
;
