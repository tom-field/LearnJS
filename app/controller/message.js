const Controller = require('egg').Controller;

class MessageController extends Controller {
    async index() {
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const request = ctx.request.body;
        const userId = request.user_id;

        const [readMessages, unreadMessages] = await Promise.all([
            service.message.getReadMessagesByUserId(userId),
            service.message.getUnreadMessagesByUserId(userId),
        ])

        // 把未读消息全部设置成已读
        await service.message.updateMessagesToRead(userId, unreadMessages);

        ret.code = 0;
        ret.data = {
            readMessages,
            unreadMessages,
        }
        this.ctx.body = ret;
    }

    async unreadCount(){
        const {ctx, config, service} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const request = ctx.request.body;
        const userId = request.user_id;

        const unreadCount = await service.message.getUnreadCountByUserId(userId);

        ret.code = 0;
        ret.data = unreadCount;
        ctx.body = ret;
    }
}

module.exports = MessageController;