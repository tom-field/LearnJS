const moment = require('moment');
const Controller = require('egg').Controller;

class topicController extends Controller {
    async index() {
        let page = parseInt(this.ctx.query.page, 10) || 1;
        page = page > 0 ? page : 1;
        const tab = this.ctx.query.tab || 'all';

        //取主题
        const query = {};
        if (!tab || tab === 'all') {
            query.tab = {
                $nin: [
                    'job',
                    'dev',
                ],
            };
        } else {
            if (tab === 'good') {
                query.good = true;
            } else {
                query.tab = tab;
            }
        }
        const limit = this.config.list_topic_count;
        const options = {
            skip: (page - 1) * limit,
            limit,
            sort: '-top -last_reply_at',
        };
        const topics = await this.service.topic.getTopicsByQuery(query, options);
        this.ctx.body = {
            topics: topics
        };
    }
}

module.exports = topicController;