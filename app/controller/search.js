const Controller = require('egg').Controller;

class searchController extends Controller {
    async index() {
        const {ctx, config} = this;

        let query = ctx.query.query;

        if (config.search !== 'local') {
            query = encodeURIComponent(query);
        }

        if (!query) {
            return ctx.redirect('/');
        }

        switch (config.search) {
            case 'google':
                return ctx.redirect(`https://www.google.com/#hl=zh-CN&q=site:cnodejs.org+${query}`);
            case 'baidu':
                return ctx.redirect(`https://www.baidu.com/s?wd=site:cnodejs.org+${query}`);
            case 'local':
                return ctx.body = {hello: 'world'};
            default:
                return this.ctx.redirect('/');
        }
    }
}

module.exports = searchController;