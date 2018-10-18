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

    async sendReplyMessage(userId, authorId, topicId, replyId) {
        const message = this.ctx.model.Message();

        message.type = 'reply';
        message.master_id = userId;
        message.author_id = authorId;
        message.topic_id = topicId;
        message.reply_id = replyId;

        return message.save();
    }

    async getReadMessagesByUserId(userId) {
        const query = {master_id: userId, has_read: true};
        return this.ctx.model.Message.find(query, null, {
            sort: '-create_at',
            limit: 20,
        }).exec();
    }

    async getUnreadMessagesByUserId(userId) {
        const query = {master_id: userId, has_read: false};
        return this.ctx.model.Message.find(query, null, {
            sort: '-create_at',
            limit: 20,
        }).exec();
    }

    async updateMessagesToRead(userId, messages) {
        if (!messages.length) {
            return;
        }
        const ids = messages.map(item => {
            return item.id;
        })
        const query = {master_id: userId, _id: {$in: ids}};
        const update = {$set: {has_read: true}};
        const opts = {multi: true};
        return this.ctx.model.Message.update(query, update, opts).exec();
    }
}

module.exports = MessageService;