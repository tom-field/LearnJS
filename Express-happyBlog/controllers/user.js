/**
 * Created by Administrator on 2016/11/27.
 */
"use strict";
const ccap = require("ccap")
exports.showRegister= function (req, res, next) {
    res.render("register.xtpl",{
        "username":res.cookie.username||"δ��¼"
    })
}
//Post username password email vcode;
exports.doRegister= function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let vcode = req.body.vcode;
    //验证逻辑暂时放前台

    //检测用户名是否存在
    //如果存在,告诉用户 用户名已经存在 SELECT;

    //如果不存在执行注册 INSERT;
    res.end("hello");
}
//每一次来请求的时候都会通过这个包生成新的验证码;
exports.getCaptcha= function (req, res, next) {
    let ary = ccap().get();

    let txt = ary[0];

    let buf = ary[1];

    console.log(txt);

    res.end(buf);
}
exports.showLogin= function (req, res, next) {

}
exports.doLogin= function (req, res, next) {

}