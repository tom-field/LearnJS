var xtpl = require('xtpl');
xtpl.renderFile('./login.xtpl', {
  title: '我是登录页面'
}, function (error, content) {
  if (error) {
    return console.log('读取文件失败');
  }
  console.log(content);
});