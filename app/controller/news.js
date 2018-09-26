const Controller = require('egg').Controller;

class NewsController extends Controller {
    async list() {
        const ctx = this.ctx;
        const page = ctx.query.page || 1;
        console.log("-------------------------------------");
        const newsList = [
            {
                url:'url',
                title: 'title',
                time: 1000,
            },{
                url:'url',
                title: 'title',
                time: 1000,
            },{
                url:'url',
                title: 'title',
                time: 1000,
            },{
                url:'url',
                title: 'title',
                time: 1000,
            },{
                url:'url',
                title: 'title',
                time: 1000,
            },{
                url:'url',
                title: 'title',
                time: 1000,
            },{
                url:'url',
                title: 'title',
                time: 1000,
            },{
                url:'url',
                title: 'title',
                time: 1000,
            },{
                url:'url',
                title: 'title',
                time: 1000,
            },{
                url:'url',
                title: 'title',
                time: 1000,
            },{
                url:'url',
                title: 'title',
                time: 1000,
            },{
                url:'url',
                title: 'title',
                time: 1000,
            },{
                url:'url',
                title: 'title',
                time: 1000,
            },
        ]
        await ctx.render('news/list.tpl', { list: newsList });
    }
}

module.exports = NewsController;