const Service = require('egg').Service;

class ReplyService extends Service {
    /**
     * 新增一条回复
     * @param user_id
     * @param comment_id
     * @param content
     * @returns {Promise.<*>}
     */
    async newAndSave(user_id, comment_id, reply_id, content) {
        const reply = new this.ctx.model.Reply();
        reply.user_id = user_id;
        reply.comment_id = comment_id;
        if(reply_id){
            reply.reply_id = reply_id;
        }else{
            reply.reply_id = null;
        }
        reply.content = content;

        await reply.save();

        return reply;
    }

    /*
   * 根据回复ID，获取回复
   * @param {String} id 回复ID
   * @return {Promise[reply]} 承载 replay 的 Promise 对象
   */
    async getReplyById(id) {
        if (!id) {
            return null;
        }

        const reply = await this.ctx.model.Reply.findOne({_id: id, deleted: false}).exec();

        if (!reply) {
            return null;
        }

        const author_id = reply.author_id;
        const author = await this.service.user.getUserById(author_id);

        reply.author = author;
        if (reply.content_is_html) {
            return reply;
        }

        /*TODO 转换文中@*/

        return reply;
    }

    /*
   * 根据主题ID，获取回复列表
   * Callback:
   * - err, 数据库异常
   * - replies, 回复列表
   * @param {String} id 主题ID
   * @return {Promise[replies]} 承载 replay 列表的 Promise 对象
   */
    async getRepliesByCommentId(id) {
        const query = {comment_id: id, deleted: false};
        let replies = await this.ctx.model.Reply.find(query, '', {sort: 'create_at'}).lean().exec();

        return Promise.all(replies.map(async item => {
            const user = await this.service.user.getUserById(item.user_id);
            let replyTo;
            if(item.reply_id){
                const reply = await this.service.reply.getReplyById(item.reply_id);
                replyTo = await this.service.user.getUserById(reply.user_id);
            }
            item.user = user || {_id: ''};
            item.replyTo = replyTo || null;
            return item;
        }))
    }

    /*
   * 根据topicId查询到最新的一条未删除回复
   * @param topicId 主题ID
   * @return {Promise[reply]} 承载 replay 的 Promise 对象
   */
    getLastReplyByTopId(topicId) {
        const query = {topic_id: topicId, deleted: false};
        const opts = {sort: {create_at: -1}, limit: 1};
        return this.ctx.model.Reply.findOne(query, '_id', opts).exec();
    }

    /**
     * 根据作者id获取回复文章列表
     * @param authorId
     * @param opt
     * @returns {Array|{index: number, input: string}}
     */
    getRepliesByAuthorId(authorId, opt = null) {
        return this.ctx.model.Reply.find({author_id: authorId}, {}, opt).exec();
    }

}

module.exports = ReplyService