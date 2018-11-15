'use strict';

const moment = require('moment');
const Controller = require('egg').Controller;

class homeController extends Controller {
    async render() {
        const ctx = this.ctx;

        if (ctx.isAuthenticated()) {
            /*ctx.body = `<div>
        <h2>${ctx.path}</h2>
        <hr>
        Logined user: <img src="${ctx.user.photo}"> ${ctx.user.displayName} / ${ctx.user.id} | <a href="/logout">Logout</a>
        <pre><code>${JSON.stringify(ctx.user, null, 2)}</code></pre>
        <hr>
        <a href="/">Home</a> | <a href="/user">User</a>
      </div>`;*/
            console.log(ctx.user);
            ctx.redirect(`http://127.0.0.1:8081/#/home?token=${ctx.user.accessToken}`);
        } else {
            /*ctx.session.returnTo = ctx.path;
            ctx.body = `
        <div>
          <h2>${ctx.path}</h2>
          <hr>
          Login with
          <a href="/passport/weibo">Weibo</a> | <a href="/passport/github">Github</a> |
          <a href="/passport/bitbucket">Bitbucket</a> | <a href="/passport/twitter">Twitter</a>
          <hr>
          <a href="/">Home</a> | <a href="/cnode-ws/user">User</a>
        </div>
      `;*/
            ctx.redirect('http://127.0.0.1:8001/#/signup')
        }
    }
}

module.exports = homeController;
