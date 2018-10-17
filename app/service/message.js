const Service = require('egg').Service;
class MessageService extends Service {

    async sendAtMessage(userId, authorId, topicId, replyId) {
        const message = this.ctx.model.Message();

        message.type = 'at';
        message.master_id = userId;
        message.author_id = authorId;
        message.topic_id = topicId;
        message.reply_id = replyId;

        return message.save();
    }
}
module.exports = MessageService;