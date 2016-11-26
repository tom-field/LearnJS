
const express = require("express");

const app = express();

//配置静态文件服务中间件
app.use('/www', express.static('www'));

//加载路由中间件
app.use(require("./router"));

app.listen("3000","127.0.0.1", function () {
    console.log("服务正在运行");
})


