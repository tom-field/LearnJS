/*本地开发环境*/
module.exports = {
    cluster: {
        listen: {
            port: 8001,
            hostname: '127.0.0.1',
        }
    },
    redis: {
        client: {
            host: '127.0.0.1',
            port: 6380,
        },
    },
    mongoose: {
        url: 'mongodb://localhost:27018/egg_cnode',
    },
};
