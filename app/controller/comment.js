'use strict';

const Controller = require('egg').Controller;

class CommentController extends Controller {
    /**
     * 添加评论
     */
    async add() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const request = ctx.request.body;
        const topic_id = request.topic_id;
        const user_id = request.user_id;
        const content = request.content;

        const [topic] = await service.topic.getTopicById(topic_id);
        const comment = await service.comment.newAndSave(user_id, topic_id, content);

        await service.topic.increaseCommentCount(topic_id);
        //TODO 非作者评论通知作者
        if (topic.author_id.toString() !== user_id.toString()) {
            await service.message.sendCommentMessage(topic.author_id, user_id, topic._id, comment._id);
        }

        ret.code = 0;
        ctx.body = ret;

    }

    /*
    * 编辑评论
    * */
    async edit() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const request = ctx.request.body;
        const user_id = request.user_id;
        const comment_id = request.comment_id;
        const content = request.content;
        const comment = await service.comment.getCommentById(comment_id);

        if (!comment) {
            ret.message = '此评论不存在或已被删除。';
            return;
        }
        if (user_id === comment.user_id.toString()) {
            if (content.trim() !== '') {
                comment.content = content;
                comment.update_at = new Date();
                await comment.save();
                ret.code = 0;
                ret.message = '评论更新成功';
                ctx.body = ret;
                return;
            }
            ret.message = '评论的字数太少。';
            ctx.body = ret;
            return;
        }
        ret.message = '对不起，你不能编辑此评论';
        ctx.body = ret;
        return;
    }

    /*
    * 评论点赞
    * */
    async up() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));
        const request = ctx.request.body
        const comment_id = request.comment_id;
        const user_id = request.user_id;
        const comment = await service.comment.getCommentById(comment_id);

        if (!comment) {
            ret.message = '此评论不存在或已被删除。';
            return;
        }
        if (user_id == comment.user_id.toString()) {
            ret.message = '呵呵，不能给自己点赞。';
            ctx.body = ret;
            return;
        }
        comment.ups = comment.ups || [];
        const upIndex = comment.ups.indexOf(user_id);
        if (upIndex === -1) {
            comment.ups.push(user_id);
            await comment.save();
        } else {
            ret.message = '不能重复点赞';
            ctx.body = ret;
            return;
        }

        ret.code = 0;
        ctx.body = ret;
    }


    /*
    * 删除评论
    * */
    async delete() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const request = ctx.request.body;
        const comment_id = request.comment_id;

        const comment = await service.comment.getCommentById(comment_id);
        const message = await service.message.getMessageByCommentId(comment_id);

        if (!comment) {
            ret.message = '没有此条评论,或者此条评论已被删除';
            ctx.body = ret;
            return;
        }
        // TODO user中间件 判断是否是回复者点击的删除,判断是否管理员
        if (comment.user_id.toString() === ctx.session.userId) {

            comment.deleted = true;
            comment.save();
            message.deleted = true;
            message.save();
            comment.commentor.score -= 5;
            comment.commentor.save();

            ret.code = 0;
            ctx.body = ret;
        } else {
            ret.message = '没有权限';
            ctx.body = ret;
            return;
        }
        await service.topic.reduceCount(comment.topic_id);
        return;
    }
}

module.exports = CommentController;