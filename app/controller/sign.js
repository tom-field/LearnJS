const validator = require('validator');

const Controller = require('egg').Controller;

class searchController extends Controller {
    /**
     * 注册 (传参:loginname,email,pass,rePass)
     * @returns {Promise.<void>}
     */
    async signup() {
        const {ctx, service, config} = this;
        const loginname = validator.trim(ctx.request.body.loginname || '').toLowerCase();
        const email = validator.trim(ctx.request.body.email || '').toLowerCase();
        const pass = validator.trim(ctx.request.body.pass || '');
        const rePass = validator.trim(ctx.request.body.re_pass || '');

        ctx.body = ctx.request.body;
    }
}

module.exports = searchController;