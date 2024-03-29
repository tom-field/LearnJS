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
        const user_id = request.user_id;
        const comment_id = request.comment_id || "";
        const reply_id = request.reply_id || "";
        const content = request.content;

        if (content.trim() == '') {
            ret.message = '回复内容不能为空!';
            return;
        }

        let comment = await service.comment.getCommentById(comment_id);

        if (!comment) {
            ret.message = '这个评论不存在,或已被评论者删除';
            return;
        }

        //TODO https://github.com/eggjs/egg/blob/master/docs/source/zh-cn/tutorials/passport.md
        // OAuth 2.0 建立权限表 支持多种登录方式

        await service.reply.newAndSave(user_id, comment_id, reply_id, content);

        ret.code = 0;
        ret.message = '';
        ctx.body = ret;

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

        const request = ctx.request.body;
        const user_id = request.user_id;
        const reply_id = request.reply_id;

        const reply = await service.reply.getReplyById(reply_id);
        if (!reply) {
            ret.message = '没有此条回复,或者此条回复已被删除';
            ctx.body = ret;
            return;
        }
        // TODO user中间件 判断是否是回复者点击的删除,判断是否管理员
        if (reply.user_id.toString() === user_id) {
            reply.deleted = true;
            reply.save();
            ret.code = 0;
            ctx.body = ret;
        } else {
            ret.message = '没有权限';
            ctx.body = ret;
            return;
        }
        return;
    }
}

module.exports = ReplyController;
