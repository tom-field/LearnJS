'use strict';

const moment = require('moment');
const Controller = require('egg').Controller;

class tabController extends Controller {
    async index() {
        const {ctx, config, service} = this;
        ctx.body = config.tabs;
    }
}

module.exports = tabController;
