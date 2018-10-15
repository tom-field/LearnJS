'use strict';

const Controller = require('egg').Controller;

class ReplyController extends Controller {
    /**
     * 添加回复
     */
    async add() {
        const {ctx, config, service} = this;
        let ret = config.ret;

        const content = ctx.request.body.r_content;
        const reply_id = ctx.request.body.reply_id;

        if(content.trim() == '') {
            ret.message = '回复内容不能为空!';
            return;
        }

        const topic_id = ctx.params.topic_id;
        let topic = await service.topic.getTopicById(topic_id);
        topic = topic.topic;

        if(!topic){
            ret.message = '这个主题不存在';
            return;
        }

        if(topic.lock){
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
            service.topic.updateLastReply(topic_id, reply._id),
        ])

        // TODO 向回复中提及的用户发消息

        ret.code = 0;
        ret.message = '发布成功';
        this.ctx.body = ret;

    }
}

module.exports = ReplyController;
