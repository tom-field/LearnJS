
const express = require("express");

const bodyParser = require("body-parser");

const path = require("path");

const cookieParser = require("cookie-parser");

const session = require("express-session");

const app = express();

//���þ�̬�ļ������м��
app.use('/www', express.static('www'));

//����cookie�м��
app.use(cookieParser());

//����session�м��
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

//���ý���post��������м��
app.use(bodyParser.urlencoded({ extended: false }));

//����ģ������
app.set('views','./views');
app.set('view engine', 'xtpl');

//����·���м��
app.use(require("./router"));

app.listen("3000","127.0.0.1", function () {
    console.log("������������");
})

