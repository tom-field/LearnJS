const Service = require('egg').Service;

class TopicService extends Service {
    async getTopicsByQuery(query, opt) {
        query.deleted = false;
        const topics = await this.ctx.model.Topic.find(query, {}, opt).exec();

        if (topics.length === 0) {
            return [];
        }

        await Promise.all(
            topics.map(async topic => {
                const [ author, reply ] = await Promise.all([
                    this.service.user.getUserById(topic.author_id),
                    // 获取主题的最后回复
                    this.service.reply.getReplyById(topic.last_reply),
                ]);
                topic.author = author;
                topic.reply = reply;
            })
        );

        return topics.filter(item => {
            // 删除不合规的 topic
            return !!item.author;
        });
    }
}
module.exports = TopicService;