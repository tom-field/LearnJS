
const express = require("express");

const app = express();

app.get("/", function (req, res) {
    res.send("test");
})

app.listen("3000","127.0.0.1", function () {
    console.log("服务正在运行");
})


