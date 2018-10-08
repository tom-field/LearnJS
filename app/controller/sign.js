const validator = require('validator');

const Controller = require('egg').Controller;

class searchController extends Controller {
    /**
     * 注册 (传参:loginname,email,pass,rePass)
     * @returns {Promise.<void>}
     */
    async signup() {
        const {ctx, service, config} = this;

        let ret = {
            code: -1,
            data: [],
            message: '',
        }

        const loginname = validator.trim(ctx.request.body.loginname || '').toLowerCase();
        const email = validator.trim(ctx.request.body.email || '').toLowerCase();
        const pass = validator.trim(ctx.request.body.pass || '');
        const rePass = validator.trim(ctx.request.body.rePass || '');
        // 参数有效性校验
        const notFull = [loginname, email, pass, rePass].some(item => {
            return item === '';
        })
        if (notFull) {
            ret.message = '信息不完整';
            ctx.body = ret;
            return;
        } else if (loginname.length < 5) {
            ret.message = '用户名太短';
            ctx.body = ret;
            return;
        } else if (!validator.isEmail(email)) {
            ret.message = '邮箱不合法';
            ctx.body = ret;
            return;
        } else if (pass !== rePass) {
            ret.message = '两次输入的密码不一致';
            ctx.body = ret;
            return;
        }
        const users = await service.user.getUsersByQuery({
            $or: [
                {loginname},
                {email},
            ]
        }, {});
        if (users.length) {
            ret.message = "用户名或邮箱已存在";
            ctx.body = ret;
            return;
        }
        // 验证通过
        const passhash = ctx.helper.bhash(pass);
        // TODO 研究makeGravatar
        const avatarUrl = '';
        await service.user.newAndSave(loginname, loginname, passhash, email, avatarUrl, false);
        // TODO 发送激活邮件

        ret.code = 0;
        ret.message = '用户注册成功';
        ctx.body = ret;
    }
}

module.exports = searchController;