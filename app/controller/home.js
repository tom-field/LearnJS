'use strict';

const Controller = require('egg').Controller;

class homeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }
}

module.exports = homeController;
