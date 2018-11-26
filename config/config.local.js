/*本地开发环境*/
module.exports = {
    cluster: {
        listen: {
            port: 7001,
            hostname: '127.0.0.1',
        }
    },
    redis: {
        client: {
            host: '127.0.0.1',
            port: 6379,
        },
    },
    mongoose: {
        url: 'mongodb://root:xuhui2014@127.0.0.1:27017/egg_dream_into_real',
    },
};
