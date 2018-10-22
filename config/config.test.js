module.exports = {
    cluster: {
        listen: {
            port: 8001,
            hostname: '192.168.20.202',
        }
    },
    redis: {
        client: {
            host: '127.0.0.1',
            port: 6379,
        },
    },
    mongoose: {
        url: 'mongodb://localhost:27017/egg_cnode',
    },
};