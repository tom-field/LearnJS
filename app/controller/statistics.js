'use strict';

const Controller = require('egg').Controller;

class StatisticsController extends Controller {
    async index() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const statistics = await service.statistics.getStatistics();
        ctx.body = statistics;
    }
}

module.exports = StatisticsController;