module.exports = () => {

    /*
     * 需要登录
     */
    return async function(ctx, next) {
        /*const authorization = ctx.get('Authorization');
        if (authorization === '') { // 判断请求头有没有携带 token ,没有直接返回 401
            ctx.status = 403;
            ctx.body = 'forbidden!';
            return;
        }*/
        await next();
    };
};