const moment = require('moment');

const Controller = require('egg').Controller;

class topicController extends Controller {
    async list() {
        const {ctx, service, config} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const request = ctx.request.body;
        const tab = request.tab || 'all';
        const keyword = request.keyword || '';
        const author_id = request.user_id;
        const user_name = request.user_name;
        const pageNo = parseInt(request.pageNo, 10) || config.pager.pageNo;
        const pageSize = parseInt(request.pageSize, 10) || config.pager.pageSize;

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
        if (keyword) {
            query.title = {
                $regex: new RegExp(keyword, 'i'),
            }
        }
        if (author_id) {
            request.author_id = author_id;
        }
        if (user_name) {
            const user = await service.user.getUserByLoginName(user_name);
            request.author_id = user._id;
        }
        const options = {
            skip: (pageNo - 1) * pageSize,
            limit: pageSize,
            sort: '-top -last_reply_at',
        };

        const totalCount = await service.topic.getCountByQuery(query);
        const topics = await service.topic.getTopicsByQuery(query, options);

        ret.code = 0;
        ret.data = topics;
        ret.pageNo = pageNo;
        ret.pageSize = pageSize;
        ret.totalCount = totalCount;
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

        const [topic, author, comments] = await service.topic.getFullTopic(topic_id);

        // 增加visit_count
        topic.visit_count += 1;
        // 写入DB
        await service.topic.increaseVisitCount(topic._id);

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
            comments,
        }

        ctx.body = ret;
    }

    async publish() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const request = ctx.request.body;

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
        ret.data = {
            topic_id: topic._id,
        }
        ctx.body = ret;

    }

    async update() {
        // TODO 创建和更新标题以及内容字数控制
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const {user_id, topic_id, title, tab, content} = ctx.request.body;

        const {topic} = await service.topic.getTopicById(topic_id);
        if (!topic) {
            ret.message = '此话题不存在,或已经被删除。';
            ctx.body = ret;
            return;
        }

        if (user_id === topic.author_id.toString()) {
            // 验证
            let editError;
            if (title === '') {
                editError = '标题不能是空的。';
            } else if (title.length < 5 || title.length > 100) {
                editError = '标题字数太多或太少。';
            } else if (!tab) {
                editError = '必须选择一个版块。';
            } else if (content === '') {
                editError = '内容不可为空。';
            }
            if (editError) {
                ret.message = editError;
                ctx.body = ret;
                return;
            }
            // 保存话题
            topic.title = title;
            topic.content = content;
            topic.tab = tab;
            topic.update_at = new Date();
            await  topic.save();
            // 提示@的人
            await service.at.sendMessageToMentionUsers(content, topic_id, user_id);

            ret.code = 0;
            ctx.body = ret;
        } else {
            ret.message = '对不起,你不能编辑此话题';
            ctx.body = ret;
        }


    }

    async delete() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const {user_id, topic_id} = ctx.request.body;
        const [topic, author] = await service.topic.getFullTopic(topic_id);
        if (!topic) {
            ret.message = '此话题不存在或已被删除';
            ctx.body = ret;
            return;
        }
        if (!topic.author_id.equals(user_id)) {
            ret.message = '无权限';
            ctx.body = ret;
            return;
        }

        author.score -= 5;
        author.topic_count -= 1;
        await author.save();
        topic.deleted = true;
        await topic.save();

        ret.code = 0;
        ctx.body = ret;
    }

    async getRecentTopics() {
        const {ctx, service, config} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        // 获取请求数据
        const request = ctx.request.body;
        const author_id = request.user_id;
        const recent_num = parseInt(request.recent_num, 10) || 5;
        //验证
        if (!author_id) {
            ret.message = 'author_id不能为空';
            ctx.body = ret;
            return;
        }
        if (!recent_num) {
            ret.message = 'recent_num不能为空';
            ctx.body = ret;
            return;
        }
        //查询
        let query = {author_id};
        const opt = {limit: recent_num, sort: '-create_at'};
        const topics = await service.topic.getTopicsByQuery(query, opt);
        ret.code = 0;
        if (!topics) {
            ret.data = [];
        } else {
            ret.data = topics;
        }
        ctx.body = ret;
    }
}

module.exports = topicController;



























