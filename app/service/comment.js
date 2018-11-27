const Service = require('egg').Service;

class CommentService extends Service {
    /*
       * 创建并保存一条评论信息
       * @param {String} content 回复内容
       * @param {String} topicId 主题ID
       * @param {String} authorId 回复作者
       * @param {String} [replyId] 回复ID，当二级回复时设定该值
       * @return {Promise} 承载 replay 列表的 Promise 对象
       */
    async newAndSave(authorId, topicId, content) {
        const comment = new this.ctx.model.Comment();
        comment.user_id = authorId;
        comment.topic_id = topicId;
        comment.content = content;

        await comment.save();

        return comment;
    }

    /*
   * 根据回复ID，获取回复
   * @param {String} id 回复ID
   * @return {Promise[reply]} 承载 replay 的 Promise 对象
   */
    async getCommentById(id) {
        if (!id) {
            return null;
        }

        const comment = await this.ctx.model.Comment.findOne({_id: id, deleted: false}).exec();

        if (!comment) {
            return null;
        }

        const user_id = comment.user_id;
        const commentor = await this.service.user.getUserById(user_id);

        comment.commentor = commentor;

        /*TODO 转换文中@*/

        return comment;
    }

    getCountByTopicId(topicId,opt) {
        const query = {topic_id: topicId, deleted: false};
        return this.ctx.model.Comment.count(query,opt).exec();
    }

    /*
   * 根据主题ID，获取回复列表
   * Callback:
   * - err, 数据库异常
   * - replies, 回复列表
   * @param {String} id 主题ID
   * @return {Promise[replies]} 承载 replay 列表的 Promise 对象
   */
    async getCommentsByTopicId(id) {
        // reply_id为null 获取topic的回复
        const query = {topic_id: id, deleted: false};
        let comments = await this.ctx.model.Comment.find(query, '', {sort: '-create_at'}).exec();
        if (comments.length === 0) {
            return [];
        }
        return Promise.all(
            comments.map(async item => {
                // 技术点:这步把mongoose对象转为json方便在上面添加属性返回
                item = item.toJSON({getters: true, virtuals: true});
                const user = await this.service.user.getUserById(item.user_id);
                const replies = await this.service.reply.getRepliesByCommentId(item._id);
                item.user = user || {_id: ''};
                item.replies = replies || [];
                return item;
            })
        )
    }

    async getLastCommentByTopId(topicId) {
        const query = { topic_id: topicId, deleted: false };
        const opts = { sort: { create_at: -1 }, limit: 1 };
        return this.ctx.model.Comment.findOne(query, '_id', opts).exec();
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

module.exports = CommentService;