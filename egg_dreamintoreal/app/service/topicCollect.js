'use strict';

const Service = require('egg').Service;

class TopicCollectService extends Service {
    getTopicCollect(userId, topicId) {
        const query = {user_id: userId, topic_id: topicId};
        return this.ctx.model.TopicCollect.findOne(query).exec();
    }

    async getCountByUserId(userId) {
        const query = {user_id: userId};
        return this.ctx.model.TopicCollect.count(query).exec();
    }

    async getCountByTopicId(topicId) {
        const query = {topic_id: topicId};
        return this.ctx.model.TopicCollect.count(query).exec();
    }

    async getTopicCollectsByUserId(userId, opt) {
        const defaultOpt = {sort: '-create_at'};
        opt = Object.assign(defaultOpt, opt);
        const collects = await this.ctx.model.TopicCollect.find({user_id: userId}, {topic_id: true}, opt).exec();
        const ids = collects.map(collect => {
            return collect.topic_id.toString();
        })
        const query = {_id: {$in: ids}};
        return await this.ctx.service.topic.getTopicsByQuery(query, {})
    }

    newAndSave(userId, topicId) {
        const topic_collect = new this.ctx.model.TopicCollect();
        topic_collect.user_id = userId;
        topic_collect.topic_id = topicId;
        return topic_collect.save();
    }

    remove(userId, topicId) {
        const query = {user_id: userId, topic_id: topicId};
        return this.ctx.model.TopicCollect.remove(query).exec();
    }
}

module.exports = TopicCollectService;