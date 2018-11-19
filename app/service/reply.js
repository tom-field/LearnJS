const Service = require('egg').Service;

class ReplyService extends Service {
    /*
       * 创建并保存一条回复信息
       * @param {String} content 回复内容
       * @param {String} topicId 主题ID
       * @param {String} authorId 回复作者
       * @param {String} [replyId] 回复ID，当二级回复时设定该值
       * @return {Promise} 承载 replay 列表的 Promise 对象
       */
    async newAndSave(content, topicId, authorId, replyId = null) {
        const reply = new this.ctx.model.Reply();
        reply.content = content;
        reply.topic_id = topicId;
        reply.author_id = authorId;

        if (replyId) {
            reply.reply_id = replyId;
        }

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
        // TODO: 添加更新方法，有些旧帖子可以转换为markdown格式的内容
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
    async getRepliesByTopicId(id) {
        // reply_id为null 获取topic的回复
        const query = {topic_id: id, reply_id: null, deleted: false};
        let replies = await this.ctx.model.Reply.find(query, '', {sort: 'create_at'}).lean().exec();

        if (replies.length === 0) {
            return [];
        }
        return Promise.all(
            replies.map(async item => {
                const author = await this.service.user.getUserById(item.author_id);
                item.author = author || {_id: ''};
                // reply_id为topic回复的reply_id 获取回复的回复
                const query = {topic_id: id, reply_id: item._id, deleted: false};
                let replies = await this.ctx.model.Reply.find(query, '', {sort: 'create_at'}).lean().exec();

                if (replies.length === 0) {
                    item.children = [];
                } else {
                    item.children = replies;
                }
                return item;
            })
        )
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