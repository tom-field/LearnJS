/**
 * Created by Administrator on 2016/11/27.
 */
const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
    res.send("hello")
})

module.exports=router;