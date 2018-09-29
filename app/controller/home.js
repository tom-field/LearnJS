'use strict';

const moment = require('moment');
const Controller = require('egg').Controller;

class homeController extends Controller {
  async index() {
      this.ctx.body = 'hello egg-cnode';
  }
}

module.exports = homeController;
