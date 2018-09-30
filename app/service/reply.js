const Service = require('egg').Service;

class ReplyService extends Service {
    /*
   * 根据回复ID，获取回复
   * @param {String} id 回复ID
   * @return {Promise[reply]} 承载 replay 的 Promise 对象
   */
    async getReplyById(id) {
        if (!id) {
            return null;
        }

        const reply = await this.ctx.model.Reply.findOne({ _id: id }).exec();

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
    async getRepliesByTopicId(id){
        const query = {topic_id: id,deleted: false};
        let replies = await this.ctx.model.Reply.find(query,'',{sort:'create_at'}).exec();

        if(replies.length === 0){
            return [];
        }
        return Promise.all(
            replies.map(async item => {
                const author = await this.service.user.getUserById(item.author_id);
                item.author = author || {_id: ''};
                return item;
            })
        )
    }

    /**
     * 根据作者id获取回复文章列表
     * @param authorId
     * @param opt
     * @returns {Array|{index: number, input: string}}
     */
    getRepliesByAuthorId(authorId, opt = null) {
        return this.ctx.model.Reply.find({ author_id: authorId }, {}, opt).exec();
    }

}

module.exports = ReplyService