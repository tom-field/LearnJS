const Controller = require('egg').Controller;

class userController extends Controller {
    async index() {
        const {ctx, service, config} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const user_name = ctx.request.body.user_name;
        const user = await service.user.getUserByLoginName(user_name);
        if (!user) {
            ctx.status = 404;
            ret.message = "这个用户不存在";
            return;
        }

        const query = {author_id: user._id};
        const opts = [{limit: 5, sort: '-create_at'}, {limit: 5, sort: '-create_at'}];
        const [recent_topics, recent_replies] = await Promise.all([
            service.topic.getTopicsByQuery(query, opts[0]),
            service.reply.getRepliesByAuthorId(user.author_id, opts[1])
        ])

        // TODO 如果用户没有激活，那么管理员可以帮忙激活

        ret.code = 0;
        ret.data = {
            user, recent_topics, recent_replies
        };
        ctx.body = ret;
    }

    /**
     * 获取积分前100用户
     * @returns {Promise.<void>}
     */
    async top100() {
        const {ctx, service, config} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));
        const opt = {limit: 100, sort: '-score'};
        ret.data = await service.user.getUsersByQuery({is_block: false}, opt);
        ret.code = 0;
        ctx.body = ret;

    }

    /**
     * 根据用户查询发布的主题
     * @returns {Promise.<void>}
     */
    async listTopics() {
        const {ctx, service, config} = this;

        let ret = JSON.parse(JSON.stringify(config.ret));

        const user_name = ctx.request.body.user_name;
        const pageNo = Number(ctx.query.pageNo) || 1;
        const limit = config.list_topic_count;

        const user = await service.user.getUserByLoginName(user_name);

        if (!user) {
            ret.status = 404;
            ret.message = '这个用户不存在';
            ctx.body = ret;
            return;
        }

        const query = {author_id: user._id};
        const opt = {skip: (pageNo - 1) * limit, limit, sort: '-create_at'};
        const [topics, totalCount] = await Promise.all([
            service.topic.getTopicsByQuery(query, opt),
            service.topic.getCountByQuery(query),
        ]);

        ret = {
            code: 0,
            data: topics,
            pageNo: pageNo,
            pageSize: limit,
            totalCount,
        }
        ctx.body = ret;
    }

    async listReplies(){
        const {ctx, service, config} = this;

        let ret = JSON.parse(JSON.stringify(config.ret));

        const user_name = ctx.request.body.user_name;
        const pageNo = Number(ctx.query.pageNo) || 1;
        const limit = config.list_topic_count;

        const user = await service.user.getUserByLoginName(user_name);

        if (!user) {
            ret.status = 404;
            ret.message = '这个用户不存在';
            ctx.body = ret;
            return;
        }

        // 获取用户评论
        let query = {author_id: user._id};
        const opt = {skip: (pageNo - 1) * limit, limit, sort: '-create_at'};
        const replies = await service.reply.getRepliesByAuthorId(user._id, opt);
        // 获取所有有评论的主题
        const topicIds = replies.map(reply => {
            return reply.topic_id.toString();
        })
        query = { _id: { $in: topicIds } };
        let topics = await service.topic.getTopicsByQuery(query, {});
        const totalCount = await service.topic.getCountByQuery(query);

        ret = {
            code: 0,
            data: topics,
            pageNo: pageNo,
            pageSize: limit,
            totalCount,
        }

        ctx.body = ret;

    }
}

module.exports = userController;