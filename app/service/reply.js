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

        const str = this.service.at.linkUsers(reply.content);
        reply.content = str;
        return reply;
    }
}

module.exports = ReplyService