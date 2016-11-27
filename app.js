
const express = require("express");

const bodyParser = require("body-parser");

const app = express();

//���þ�̬�ļ������м��
app.use('/www', express.static('www'));

//���ý���post��������м��
app.use(bodyParser.urlencoded({ extended: false }));

//����ģ������
app.set('views','./views');
app.set('view engine', 'xtpl');
app.use(function(req, res){
    res.render('test',{data:1});
});

//����·���м��
app.use(require("./router"));

app.listen("3000","127.0.0.1", function () {
    console.log("������������");
})


