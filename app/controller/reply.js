'use strict';

const Controller = require('egg').Controller;

class ReplyController extends Controller {
    /**
     * 添加回复
     */
    async add() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const request = ctx.request.body;
        const topic_id = request.topic_id;
        const reply_id = request.reply_id;
        const content = request.content;

        if (content.trim() == '') {
            ret.message = '回复内容不能为空!';
            return;
        }

        let topic = await service.topic.getTopicById(topic_id);
        topic = topic.topic;

        if (!topic) {
            ret.message = '这个主题不存在';
            return;
        }

        if (topic.lock) {
            ret.message = '该主题已锁定';
            return;
        }
        //TODO https://github.com/eggjs/egg/blob/master/docs/source/zh-cn/tutorials/passport.md
        // OAuth 2.0 建立权限表 支持多种登录方式
        const user_id = ctx.session.userId;
        console.log(user_id);
        const topicAuthor = await service.user.getUserById(topic.author_id);
        const newContent = content.replace('@' + topicAuthor.loginname + ' ', '');
        const reply = await service.reply.newAndSave(content, topic_id, user_id, reply_id);

        await Promise.all([
            service.user.incrementScoreAndReplyCount(user_id, 5, 1),
            service.topic.updateLastReply(topic_id, reply.id),
        ])

        // 通知@到的用户
        await service.at.sendMessageToMentionUsers(newContent, topic_id, user_id, reply_id);
        // 如果是非作者回复,提示作者
        if (topic.author_id.toString() !== user_id) {
            await service.message.sendReplyMessage(user_id, topic.author_id, topic_id, reply.id);
        }

        ret.code = 0;
        ret.message = '回复成功';
        this.ctx.body = ret;

    }

    /*
    * 编辑回复
    * */
    async edit() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const user_id = ctx.session.userId;
        const request = ctx.request.body;
        const reply_id = request.reply_id;
        const content = request.content;
        const reply = await service.reply.getReplyById(reply_id);

        if (!reply) {
            ret.message = '此回复不存在或已被删除。';
            return;
        }
        if (user_id === reply.author_id.toString()) {
            if (content.trim() !== '') {
                reply.content = content;
                reply.update_at = new Date();
                await reply.save();
                ret.code = 0;
                ret.message = '回复更新成功';
                ctx.body = ret;
                return;
            }
            ret.message = '回复的字数太少。';
            ctx.body = ret;
            return;
        }
        ret.message = '对不起，你不能编辑此回复';
        ctx.body = ret;
        return;
    }

    /*
    * 回复点赞
    * */
    async up() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));
        const reply_id = ctx.request.body.reply_id;
        const user_id = ctx.session.userId;
        const reply = await service.reply.getReplyById(reply_id);

        if (!reply) {
            ret.message = '此回复不存在或已被删除。';
            return;
        }
        if(user_id == reply.author_id.toString()){
            ret.message = '呵呵，不能帮自己点赞。';
            ctx.body = ret;
            return;
        }
        let action;
        reply.ups = reply.ups || [];
        const upIndex = reply.ups.indexOf(user_id);
        if(upIndex === -1){
            reply.ups.push(user_id);
            action = 'up';
        }else {
            reply.ups.splice(upIndex,1);
            action = 'down';
        }
        await reply.save();
        ret.code = 0;
        ret.data = action;
        ctx.body = ret;
    }


    /*
    * 删除回复
    * */
    async delete() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const reply_id = ctx.request.body.reply_id;
        const reply = await service.reply.getReplyById(reply_id);
        if (!reply) {
            ret.message = '没有此条回复,或者此条回复已被删除';
            ctx.body = ret;
            return;
        }
        // TODO user中间件 判断是否是回复者点击的删除,判断是否管理员
        if (reply.author_id.toString() === ctx.session.userId) {
            reply.deleted = true;
            reply.save();
            ret.code = 0;
            ctx.body = ret;
            reply.author.score -= 5;
            reply.author.reply_count -= 1;
            reply.author.save();
        } else {
            ret.message = '没有权限';
            ctx.body = ret;
            return;
        }
        await service.topic.reduceCount(reply.topic_id);
        return;
    }
}

module.exports = ReplyController;
