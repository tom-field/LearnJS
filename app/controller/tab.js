'use strict';

const moment = require('moment');
const Controller = require('egg').Controller;

class tabController extends Controller {
    async index() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        ret.code = 0;
        ret.data = config.tabs;
        ctx.body = ret;
    }
}

module.exports = tabController;
