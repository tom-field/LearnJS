'use strict';

const Controller = require('egg').Controller;

class StatisticsController extends Controller {
    async index() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const statistics = await service.statistics.getStatistics();
        ret.code = 0;
        ret.data = statistics;
        ctx.body = ret;
    }
}

module.exports = StatisticsController;