
const express = require("express");

const bodyParser = require("body-parser");

const app = express();

//配置静态文件服务中间件
app.use('/www', express.static('www'));

//配置解析post请求体的中间件
app.use(bodyParser.urlencoded({ extended: false }));

//配置模板引擎
app.set('views','./views');
app.set('view engine', 'xtpl');
app.use(function(req, res){
    res.render('test',{data:1});
});

//加载路由中间件
app.use(require("./router"));

app.listen("3000","127.0.0.1", function () {
    console.log("服务正在运行");
})


