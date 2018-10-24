'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.prefix('/cnode');
    router.get('/', controller.home.index);
    router.get('/news', controller.news.list);
    router.post('/sign/signup', controller.sign.signup);                   // 注册
    router.get('/active_account',controller.sign.activeAccount);           // 激活
    router.post('/sign/signin', controller.sign.signin);                   // 登录
    router.post('/reset_pass', controller.sign.updatePass);                // 更新密码
    router.post('/sign/signout', controller.sign.signout);                 // 退出
    router.get('/user/:name', controller.user.index);                      // 获取用户信息
    router.get('/user/:name/topics', controller.user.listTopics);          // 用户发布的所有话题页
    router.get('/user/:name/replies', controller.user.listReplies);        // 用户参与的所有回复页
    router.get('/users/top100', controller.user.top100);                   // 显示积分前一百用户页
    router.post('/topic/create',controller.topic.publish);                 // 发布话题
    router.post('/file/upload',controller.file.upload);                   // 单个文件上传
    router.post('/file/uploads',controller.file.uploads);                 // 多个文件上传
    router.get('/list', controller.topic.list);                            // 获取话题列表
    router.get('/list/:tid', controller.topic.index);                      // 显示某个话题
    router.get('/my/message', controller.message.index);                   // 显示消息
    router.post('/:topic_id/reply',controller.reply.add);                  // 添加回复
    router.post('/reply/:reply_id/edit',controller.reply.edit);            // 编辑回复
    router.post('/reply/:reply_id/up', controller.reply.up);                          // 回复点赞
    router.get('/reply/:reply_id/delete',controller.reply.delete);         // 删除回复
    router.get('/search', controller.search.index);                        // 搜索
};
