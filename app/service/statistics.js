const Service = require('egg').Service;

class StatisticsService extends Service {
    async getStatistics() {
        const query = {deleted: false};
        const userCount = await this.ctx.model.User.count();
        const topicCount = await this.ctx.model.Topic.count(query);
        const commentCount = await this.ctx.model.Comment.count(query);
        return [userCount, topicCount, commentCount];
    }
}

module.exports = StatisticsService;