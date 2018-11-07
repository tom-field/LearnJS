const moment = require('moment');

const Controller = require('egg').Controller;

class topicController extends Controller {
    async list() {
        const {ctx, service, config} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const request = ctx.request.body;
        let page = parseInt(request.page, 10) || 1;
        page = page > 0 ? page : 1;
        const tab = request.tab || 'all';

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
        ret.code = 0;
        ret.data = topics;
        ctx.body = ret;
    }

    async detail() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const topic_id = ctx.request.body.topic_id;
        const currentUser = ctx.user;

        if (topic_id.length != 24) {
            ctx.status = 404;
            ret.message = "此话题不存在或已被删除";
            ctx.body = ret;
            return;
        }

        const [topic, author, replies] = await service.topic.getFullTopic(topic_id);

        if (!topic) {
            ctx.status = 404;
            ret.message = "此话题不存在或已被删除";
            ctx.body = ret;
            return;
        }

        ret.code = 0;
        ret.data = {
            topic_id,
            currentUser,
            topic,
            author,
            replies,
        }

        ctx.body = ret;
    }

    async publish() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const {tabs} = config;
        const request = ctx.request.body;

        // 得到所有的 tab, e.g. ['ask', 'share', ..]
        const allTabs = tabs.map(item => item[0]);

        // TODO 完整验证 暂时只验证是否为空
        if (!request.title || !request.content || !request.tab) {
            ret.message = '请求参数有误';
            ctx.body = ret;
            return;
        }

        // 储存新主题帖 TODO 判断用户是否登录得中间件
        const user_id = ctx.session.userId; //TODO 多种类型帐号如何获取
        const topic = await  service.topic.newAndSave(
            request.title,
            request.content,
            request.tab,
            user_id
        );

        // 发帖用户增加积分,增加发表主题数量
        await service.user.incrementScoreAndReplyCount(topic.author_id, 5, 1);

        // 通知被@的用户
        await service.at.sendMessageToMentionUsers(
            request.content,
            topic._id,
            user_id
        );

        ret.code = 0;
        ctx.body = ret;

    }
}

module.exports = topicController;



























