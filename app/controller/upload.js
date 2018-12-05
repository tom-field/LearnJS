const path = require('path');
const moment = require('moment');
const uuidv1 = require('uuid/v1');

const Controller = require('egg').Controller;

class uploadController extends Controller {
    /**
     * 上传用户头像
     */
    async uploadAvatar() {
        const {ctx, service, config} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const uid = uuidv1();
        const parts = ctx.multipart({autoFields: true});
        const stream = await parts();
        const user_id = parts.field.user_id;
        const oldAvatar = parts.field.avatar;
        const filename = uid + path.extname(stream.filename).toLowerCase();

        try {
            //上传新头像
            const uploadRes = await service.file.qnUpload(stream, filename);
            //删除旧头像
            if (oldAvatar) {
                await service.file.qnDelete(oldAvatar);
            }
            const avatar = config.qn_access.origin + '/' + uploadRes.key;
            await service.user.updateUserInfo(user_id, {avatar})
            ret.code = 0;
            ret.data = {
                url: config.qn_access.origin + '/' + uploadRes.key,
            }
            ctx.body = ret;
        } catch (err) {
            await sendToWormhole(stream);
            throw err;
        }
    }

    /**
     * 上传图片
     */
    async uploadImg() {
        const {ctx, service, config} = this;
        let ret = JSON.parse(JSON.stringify(config.ret));

        const uid = uuidv1();
        const parts = ctx.multipart({autoFields: true});
        const stream = await parts();
        const filename = uid + path.extname(stream.filename).toLowerCase();

        try {
            const uploadRes = await service.file.qnUpload(stream, filename);
            const qnUrl = config.qn_access.origin + '/' + uploadRes.key;

            ret.code = 0;
            ret.data = {
                url: qnUrl
            }
            ctx.body = ret;
        } catch (err) {
            await sendToWormhole(stream);
            throw err;
        }
    }


}
module.exports = uploadController;