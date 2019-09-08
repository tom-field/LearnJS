'use strict';

module.exports = appInfo => {
    const config = exports = {};

    // 安全控制
    config.security = {
        csrf: false,
        ctoken: false,
    };

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1547519097352_2495';

    // add your config here
    config.middleware = [];

    config.sequelize = {
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        username: 'root',
        password: 'xuhui2014',
        database: 'dreamintoreal_data_dev',
    };


    return config;
};
