const Service = require('egg').Service;

class MessageService extends Service {

    async sendAtMessage(userId, authorId, topicId, commentId) {
        const message = this.ctx.model.Message();

        message.type = 'at';
        message.master_id = userId;
        message.author_id = authorId;
        message.topic_id = topicId;
        message.comment_id = commentId;

        return message.save();
    }

    async sendCommentMessage(userId, authorId, topicId, commentId) {
        const message = this.ctx.model.Message();

        message.type = 'comment';
        message.master_id = userId;
        message.author_id = authorId;
        message.topic_id = topicId;
        message.comment_id = commentId;

        return message.save();
    }

    getUnreadCountByUserId(userId) {
        const query = {master_id: userId, has_read: false, deleted: false};
        return this.ctx.model.Message.count(query).exec();
    }

    async getMessageByCommentId(commentId) {
        const query = {comment_id: commentId};
        return this.ctx.model.Message.findOne(query).exec();
    }

    async getReadMessagesByUserId(userId) {
        const query = {master_id: userId, has_read: true, deleted: false};
        let readMessages = await this.ctx.model.Message.find(query, null, {sort: '-create_at', limit: 20,}).lean().exec();
        if(!readMessages.length){
            return [];
        }
        return Promise.all(
            readMessages.map(async readMessage => {
                const user = await this.service.user.getUserById(readMessage.author_id);
                const [topic] = await this.service.topic.getTopicById(readMessage.topic_id);
                readMessage.user = user;
                readMessage.topic = topic;
                return readMessage;
            })
        )
    }

    async getUnreadMessagesByUserId(userId) {
        const query = {master_id: userId, has_read: false, deleted: false};
        const unreadMessages = await this.ctx.model.Message.find(query, null, {sort: '-create_at', limit: 20,}).lean().exec();
        if(!unreadMessages.length){
            return [];
        }
        return Promise.all(
            unreadMessages.map(async unreadMessage => {
                const user = await this.service.user.getUserById(unreadMessage.author_id);
                const [topic] = await this.service.topic.getTopicById(unreadMessage.topic_id);
                unreadMessage.user = user;
                unreadMessage.topic = topic;
                return unreadMessage;
            })
        )
    }

    async updateMessagesToRead(userId, messages) {
        if (!messages.length) {
            return;
        }
        const ids = messages.map(item => {
            return item._id;
        })
        const query = {master_id: userId, _id: {$in: ids}};
        const update = {$set: {has_read: true}};
        const opts = {multi: true};
        return this.ctx.model.Message.update(query, update, opts).exec();
    }
}

module.exports = MessageService;