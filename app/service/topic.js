const Service = require('egg').Service;

class TopicService extends Service {

    newAndSave(title, content, tab, authorId) {
        const topic = new this.ctx.model.Topic();
        topic.title = title;
        topic.content = content;
        topic.tab = tab;
        topic.author_id = authorId;

        return topic.save();
    }

    async getTopicById(id){
        const topic = await this.ctx.model.Topic.findOne({ _id: id }).exec();
        if(!topic){
            return {
                topic: null,
                author: null,
                last_reply: null,
            };
        }

        const author = await this.service.user.getUserById(topic.author_id);

        let last_reply = null;
        if (topic.last_reply) {
            last_reply = await this.service.reply.getReplyById(topic.last_reply);
        }

        return {
            topic,
            author,
            last_reply,
        };

    }

    async getTopicsByQuery(query, opt) {
        query.deleted = false;
        // TODO: 此处注意查找到的数据修改但是返回到前端不展示,用lean()方法
        const topics = await this.ctx.model.Topic.find(query, {}, opt).lean().exec();

        if (topics.length === 0) {
            return [];
        }

        await Promise.all(
            topics.map(async topic => {
                const [author, reply] = await Promise.all([
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

    async getFullTopic(id) {
        const query = {_id: id, deleted: false};
        const topic = await this.ctx.model.Topic.findOne(query);

        if (!topic) {
            // throw new Error('此话题不存在或已被删除。');
            return [];
        }

        /*TODO linkedContent 转换文中的@用户*/

        const author = await this.service.user.getUserById(topic.author_id);
        if (!author) {
            // throw new Error('话题的作者丢了。');
            return [];
        }

        const replies = await this.service.reply.getRepliesByTopicId(topic._id);

        return [topic, author, replies];
    }

    async getCountByQuery(query) {
        return this.ctx.model.Topic.count(query).exec();
    }

    async updateLastReply(topicId, replyId) {
        const update = {
            last_reply: replyId,
            last_reply_at: new Date(),
            $inc: {
                reply_count: 1,
            },
        }
        const opts = {new: true};
        return this.ctx.model.Topic.findByIdAndUpdate(topicId,update,opts).exec();
    }

    /*
   * 将当前主题的回复计数减1，并且更新最后回复的用户，删除回复时用到
   * @param {String} id 主题ID
   */
    async reduceCount(id) {
        const update = { $inc: { reply_count: -1 } };
        const reply = await this.service.reply.getLastReplyByTopId(id);
        if (reply) {
            update.last_reply = reply._id;
        } else {
            update.last_reply = null;
        }
        const opts = { new: true };

        const topic = await this.ctx.model.Topic.findByIdAndUpdate(id, update, opts).exec();
        if (!topic) {
            throw new Error('该主题不存在');
        }

        return topic;
    }
}

module.exports = TopicService;