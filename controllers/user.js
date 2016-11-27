/**
 * Created by Administrator on 2016/11/27.
 */
"use strict";

exports.showRegister= function (req, res, next) {
    res.render("register.xtpl",{
        "username":res.cookie.username||"未登录"
    })
}
exports.doRegister= function (req, res, next) {
    //采集数据
    let username = req.body.username;
    console.log(username);
    /*let password = req.body.password;
    let email = req.body.email;
    let vcode = req.body.vcode;*/
    res.cookie("username",username);
    res.end("123456789")
    res.redirect("back");
}
exports.showLogin= function (req, res, next) {

}
exports.doLogin= function (req, res, next) {

}