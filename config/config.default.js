'use strict';
const path = require('path');

module.exports = appInfo => {
    const config = exports = {};
    config.host = 'http://xuhuidev.com'
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

    config.host = process.env.EGG_SERVER_ENV == 'local' ? 'http://localhost:8081' : 'http://xuhuidev.com/my-cnode';

    // 版块
    config.tabsbak = [['share', '分享'], ['ask', '问答'], ['math', '数学'], ['fiance', '理财'], ['friend', '交友'], ['transaction', '交易'], ['server', '服务器'], ['job', '招聘']];
    config.tabs = [
        {
            label: '分享',
            value: 'share',
        },
        {
            label: '问答',
            value: 'ask',
        },
        {
            label: '数学',
            value: 'math',
        },
        {
            label: '理财',
            value: 'fiance',
        },
        {
            label: '交友',
            value: 'friend',
        },
        {
            label: '交易',
            value: 'transaction',
        },
        {
            label: '服务器',
            value: 'server',
        },
        {
            label: '招聘',
            value: 'job',
        },
    ]

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
        // mongoose.connect('mongodb://username:password@127.0.0.1:27017/dbname
        // 如果没有用户名和密码可以去掉
        url: process.env.EGG_MONGODB_URL || 'mongodb://127.0.0.1:27017/egg_cnode',
        poolSize: 20,
        reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
        reconnectInterval: 500, // Reconnect every 500ms
        useNewUrlParser: true,
    };
    // 静态资源
    config.assets = {
        publicPath: '/public/',
    }
    // 上传
    config.upload = {
        path: path.join(__dirname, '../app/public/upload'),
        url: '/public/upload/',
    };
    config.multipart = {
        mode: 'stream',    //file stream
    };
    // 7牛的access信息，用于文件上传
    config.qn_access = {
        accessKey: '4sS6Qxld8jvVKUk4E5NXh-m_irPX90oLfkMy0v_3',
        secretKey: 'dRjcCy8UB3x3n7c0JCpt_WU07uPKP54NxVS5m4rb',
        bucket: 'test',
        origin: 'http://phv27sna5.bkt.clouddn.com',
        // 如果vps在国外，请使用 http://up.qiniug.com/ ，这是七牛的国际节点
        // 如果在国内，此项请留空
        uploadURL: '',
    };
    config.passportGithub = {
        key: process.env.EGG_PASSPORT_GITHUB_CLIENT_ID || '2077f6a3dabfbf142af0',
        secret: process.env.EGG_PASSPORT_GITHUB_CLIENT_SECRET || 'e136c0ef50091c01c89a8cd7db9c42dfd7af7c5f',
    };
    config.passportGoogle = {
        key: process.env.EGG_PASSPORT_GOOGLE_CLIENT_ID || '558941605894-28l3eu0eg8ldt1q5dq2hkobkdhc33m5g.apps.googleusercontent.com',
        secret: process.env.EGG_PASSPORT_GOOGLE_CLIENT_SECRET || 'N6TsmBp469blmxnGeokwUDOP',
    };
    config.auth_cookie_name = 'node_club';

    // 阿里node性能平台
    config.alinode = {
        appid: process.env.EGG_ALINODE_APPID || '',
        secret: process.env.EGG_ALINODE_SECRET || '',
    };
    // 默认主题显示数量
    config.list_topic_count = 20;

    // 分页默认参数
    config.pager = {
        pageNo: 1,
        pageSize: 20,
    }

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
