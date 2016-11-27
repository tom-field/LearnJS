/**
 * Created by Administrator on 2016/11/27.
 */
const express = require("express");

const router = express.Router();

const indexController = require("./controllers/index")
const userController = require("./controllers/user")
const articalController = require("./controllers/article")

router.get("/",indexController.showIndex);
router.get("/register",userController.showRegister);
router.get("/register",userController.doRegister);
router.get("/login",userController.showLogin);
router.post("/login",userController.doLogin);
router.get("/article",articalController.showArticle);

module.exports=router;