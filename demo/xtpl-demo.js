var xtpl = require('xtpl');
//渲染登录页面
xtpl.renderFile('./login.xtpl', {
  title: '我是登录页面'
}, function (error, content) {
  if (error) {
    return console.log('读取文件失败');
  }
  console.log(content);
});
//渲染注册页面
xtpl.renderFile('./login.xtpl', {
  title: '我是注册页面'
}, function (error, content) {
  if (error) {
    return console.log('读取文件失败');
  }
  console.log(content);
});