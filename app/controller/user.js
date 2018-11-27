const path = require('path');
const uuidv1 = require('uuid/v1');
const validator = require('validator');
const sendToWormhole = require('stream-wormhole');
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
        const [recent_topics, collected_topics, recent_replies] = await Promise.all([
            service.topic.getTopicsByQuery(query, opts[0]),
            service.topicCollect.getTopicCollectsByUserId(user._id, opts[0]),
            service.reply.getRepliesByAuthorId(user._id, opts[1]),
        ])

        ret.code = 0;
        ret.data = {
            user, recent_topics, collected_topics, recent_replies
        };
        ctx.body = ret;
    }

    /**
     * 获取积分前100用户
     * @returns {Promise.<void>}
     */
    async topUsers() {
        const {ctx, service, config} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const request = ctx.request.body;
        const limit = request.pageSize;
        const pageNo = request.pageNo;

        const opt = {skip: (pageNo - 1) * limit, limit, sort: {score: -1, create_at: 1}};

        ret.code = 0;
        ret.data = await service.user.getUsersByQuery({is_block: false}, opt);
        ret.totalCount = await service.user.getCountByQuery({is_block: false});
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

    async listReplies() {
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
        query = {_id: {$in: topicIds}};
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

    /**
     * 更新用户头像
     */
    async updateAvatar() {
        const {ctx, service, config} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const uid = uuidv1();
        const parts = ctx.multipart({autoFields: true});
        const stream = await parts();
        const user_id = parts.field.user_id;
        const oldAvatar = parts.field.avatar;
        const filename = uid + path.extname(stream.filename).toLowerCase();

        try {
            //上传新头像
            const uploadRes = await service.file.qnUpload(stream, filename);
            //删除旧头像
            if (oldAvatar) {
                await service.file.qnDelete(oldAvatar);
            }
            const avatar = config.qn_access.origin + '/' + uploadRes.key;
            await service.user.updateUserInfo(user_id, {avatar})
            ret.code = 0;
            ret.data = {
                url: config.qn_access.origin + '/' + uploadRes.key,
            }
            ctx.body = ret;
        } catch (err) {
            await sendToWormhole(stream);
            throw err;
        }
    }

    async updatePassword() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const userId = validator.trim(ctx.request.body.user_id || '');
        const password = validator.trim(ctx.request.body.password) || '';
        const newPassword = validator.trim(ctx.request.body.newPassword) || '';
        const renewPassword = validator.trim(ctx.request.body.renewPassword) || '';

        if (newPassword != renewPassword) {
            ret.message = '两次输入密码不一致!';
            ctx.body = ret;
            return;
        }

        const user = await service.user.getUserById(userId);
        if (!user) {
            ret.message = '用户不存在';
            ctx.body = ret;
            return;
        }
        const isCompare = ctx.helper.bcompare(password, user.pass);
        if (!isCompare) {
            ret.message = '原密码不正确!';
            ctx.body = ret;
            return;
        }
        const newPasshash = ctx.helper.bhash(newPassword);
        user.pass = newPasshash;
        user.retrieve_key = null;
        user.retrieve_time = null;
        await user.save();

        ret.code = 0;
        ret.message = '密码更新成功';
        ctx.body = ret;
    }

    async updateInfo() {
        const {ctx, service, config} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const request = ctx.request.body;
        const userId = request.user_id;
        const url = validator.trim(request.url || '');
        const location = validator.trim(request.location || '');
        const weibo = validator.trim(request.weibo || '');
        const signature = validator.trim(request.signature || '');

        const user = await service.user.getUserById(userId);
        user.url = url;
        user.location = location;
        user.signature = signature;
        user.weibo = weibo;
        await user.save();
        ret.code = 0;
        ctx.body = ret;
    }
}

module.exports = userController;