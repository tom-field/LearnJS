
const express = require("express");

const app = express();

//���þ�̬�ļ������м��
app.use('/www', express.static('www'));

//����·���м��
app.use(require("./router"));

app.listen("3000","127.0.0.1", function () {
    console.log("������������");
})


