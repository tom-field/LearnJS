const Controller = require('egg').Controller;

class MessageController extends Controller {
    async index() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const userId = ctx.session.userId;

        const [readMessageResults, unReadMessageResults] = await Promise.all([
            service.message.getReadMessagesByUserId(userId),
            service.message.getUnreadMessagesByUserId(userId),
        ])

        // 把未读消息全部设置成已读
        await service.message.updateMessagesToRead(userId, unReadMessageResults);

        ret.code = 0;
        ret.data = {
            readMessageResults,
            unReadMessageResults,
        }
        this.ctx.body = ret;
    }
}

module.exports = MessageController;