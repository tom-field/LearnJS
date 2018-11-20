'use strict';

const Controller = require('egg').Controller;
//目前前后端分离,第三方认证后回调的页面到这里处理,获得token后通过URL传送到前端
class homeController extends Controller {
    async index() {
        const {ctx, config} = this;
        if (ctx.isAuthenticated()) {
            ctx.session.userId = ctx.user._id;
            ctx.session.loginname = ctx.user.loginname;
            ctx.redirect(`${config.host}/#/home?token=${ctx.user.accessToken}`);
        } else {
            ctx.redirect(`${config.host}/#/signup`);
        }
    }
}

module.exports = homeController;