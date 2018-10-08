const Service = require('egg').Service;

class SearchService extends Service {
    /**
     * 本地查询
     * @param query
     * @param keyworld
     * @returns {Promise.<*>}
     */
    async searchLocal(query, keyworld) {
        const {tab} = query;
        const page = parseInt(query.page) || 1;
        let users = [];
        let topics = [];
        let data = [];
        let count = this.config.list_topic_count;

        switch (tab) {
            case 'user':
                var query = {['loginname']: {$regex: new RegExp(keyworld, 'i')}};
                var opt = {skip: (page - 1) * count, limit: count, sort: '-create_at'};
                return Promise.all([
                    this.service.user.getUsersByQuery(query, opt),
                    this.service.user.getCountByQuery(query),
                ]);
                break;
            case 'topic':
                var query = {['title']: {$regex: new RegExp(keyworld, 'i')}};
                var opt = {skip: (page - 1) * count, limit: count, sort: '-create_at'};
                return Promise.all([
                    this.service.topic.getTopicsByQuery(query, opt),
                    this.service.topic.getCountByQuery(query),
                ]);
                break;
            default:
                return this.searchUserAndTopic(keyworld, page);
        }

        const pages = Math.ceil(count / this.limit);

        return {
            hello: "world",
        }
    }

    /*
   * 根据关键字查找用户和帖子列表
   * @param {String} keyword 关键字, {Number} page 第几页
   * @return {Promise[data, count]} 承载用户列表, 帖子列表的 Promise 对象
   */
    async searchUserAndTopic(keyworld,page) {
        const userQuery = {['loginname']: {$regex: new RegExp(keyworld, 'i')}};
        const topicQuery = {['title']: {$regex: new RegExp(keyworld, 'i')}};
        const opt = { skip: (page - 1) * this.config.list_topic_count,
            limit: this.config.list_topic_count, sort: '-create_at' };
        console.log(userQuery);
        console.log(topicQuery);
        console.log(opt);
        return Promise.all([
            this.service.user.getUsersByQuery(userQuery,opt),
            this.service.topic.getTopicsByQuery(topicQuery,opt),
        ]);
    }
}

module.exports = SearchService