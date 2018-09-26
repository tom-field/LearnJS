'use strict';

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
    // add your config here
    config.middleware = ['robot'];
    config.robot = {
        ua: [
            /Baiduspider/i,
        ]
    }

    return config;
}
;
