const moment = require('moment');
const Controller = require('egg').Controller;

class topicController extends Controller {
    async index(){
        let ret = {
            code : -1,
            data: [],
            message:'',
        }
        const { ctx, service } = this;

        const topic_id = ctx.params.tid;
        const currentUser = ctx.user;

        if(topic_id.length!=24){
            ctx.status = 404;
            ret.message = "此话题不存在或已被删除";
            ctx.body = ret;
            return;
        }

        const [topic,author,replies] = await service.topic.getFullTopic(topic_id);

        this.ctx.body = {
            topic_id: topic_id,
            currentUser: currentUser,
            topic: topic,
            author: author,
            replies: replies,
        }
    }

    async list() {
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
            query: query,
            topics: topics
        };
    }
}

module.exports = topicController;