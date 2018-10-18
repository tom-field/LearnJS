const validator = require('validator');
const utility = require('utility');

const Controller = require('egg').Controller;

class searchController extends Controller {
    /**
     * 注册 (传参:loginname,email,pass,rePass)
     * @returns {Promise.<void>}
     */
    async signup() {
        const {ctx, service, config} = this;

        let ret = JSON.parse(JSON.stringify(config.ret));

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
        await service.mail.sendActiveMail(email, utility.md5(email + passhash + config.session_secrect), loginname);
        ret.code = 0;
        ret.message = '用户注册成功';
        ctx.body = ret;
    }

    /**
     * 登录
     * @return {Promise.<void>}
     */
    // TODO 登录判断用户有没有激活
    async signin() {
        const {ctx, service, config} = this;

        const ret = {
            code: -1,
            data: [],
            message: '',
        };

        const loginname = validator.trim(ctx.request.body.loginname || '').toLowerCase();
        const pass = validator.trim(ctx.request.body.pass || '');
        const users = await service.user.getUsersByQuery({loginname});
        console.log(users);
        if (!users.length) {
            ret.message = '用户不存在';
            ctx.body = ret;
            return;
        }
        if (ctx.helper.bcompare(pass, users[0].pass)) {
            ret.code = 0;
            ret.data = users[0];
            ctx.session.userId = users[0]._id;
            ctx.body = ret;
        } else {
            ret.message = '密码不正确';
            ctx.body = ret;
        }
    }

    /**
     * 退出登录
     * @return {Promise.<void>}
     */
    async signout() {
        const {ctx} = this;
        console.log(ctx.session);
        ctx.session = null;
        ctx.body = {
            code: 0,
            data: [],
            message: '',
        };
    }

    /**
     * 账户激活
     * @returns {Promise.<void>}
     */
    async activeAccount() {
        const { ctx, service, config } = this;

        let ret = JSON.parse(JSON.stringify(config.ret));

        const key = validator.trim(ctx.query.key || '');
        const name = validator.trim(ctx.query.name || '');

        const user = await service.user.getUserByLoginName(name);
        if(!user){
            ret.message = '用户不存在';
            ctx.body = ret;
            return;
        }
        const passhash = user.pass;
        if (!user || utility.md5(user.email + passhash + config.session_secret) !== key) {
            ret.message = '信息有误，帐号无法被激活。';
            ctx.body = ret;
            return;
        }
        if(user.active){
            ret.message = '帐号已经是激活状态';
            ctx.body = ret;
            return;
        }
        user.active = true;
        await user.save();
        ret.code = 0;
        ret.message = '帐号已被激活，请登录';
        ctx.body = ret;
    }

    /**
     * 更新密码
     * @returns {Promise.<void>}
     */
    async updatePass(){
        const { ctx, service } = this;

        let ret = JSON.parse(JSON.stringify(config.ret));

        const psw = validator.trim(ctx.request.body.psw) || '';
        const repsw = validator.trim(ctx.request.body.repsw) || '';
        const userId = validator.trim(ctx.request.body.userId || '');

        if(psw != repsw){
            ret.message = '两次输入的密码不一致';
            ctx.body = ret;
            return;
        }

        const user = await service.user.getUserById(userId);
        if(!user){
            ret.message = '用户不存在';
            ctx.body = ret;
            return;
        }
        const passhash = ctx.helper.bhash(psw);
        user.pass = passhash;
        user.retrieve_key = null;
        user.retrieve_time = null;
        await user.save();

        ret.code = 0;
        ret.message = '密码更新成功';
        ctx.body = ret;
    }
}

module.exports = searchController;