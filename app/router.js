'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
//路由控制给到前端,后端使用post请求
module.exports = app => {
    const {router, controller} = app;
    router.prefix('/cnode-ws');
    //router.get('/', controller.home.index);
    router.post('/news', controller.news.list);

    //登录登出等
    router.post('/sign/signup', controller.sign.signup);                    // 注册
    router.post('/active_account', controller.sign.activeAccount);          // 激活
    router.post('/sign/signin', controller.sign.signin);                    // 登录
    router.post('/reset_pass', controller.sign.updatePass);                 // 更新密码
    router.post('/sign/signout', controller.sign.signout);                  // 退出

    //user
    router.post('/user/updateAvatar',controller.user.updateAvatar);         // 更新头像
    router.post('/user/updatePassword',controller.user.updatePassword);     // 更新密码
    router.post('/user/updateInfo',controller.user.updateInfo);             // 更新信息
    router.post('/user/detail', controller.user.index);                     // 获取用户信息
    router.post('/user/topics', controller.user.listTopics);                // 用户发布的所有话题页
    router.post('/user/replies', controller.user.listReplies);              // 用户参与的所有回复页
    router.post('/user/top100', controller.user.top100);                    // 显示积分前一百用户页

    //topic
    router.post('/topic/create', controller.topic.publish);                 // 发布话题
    router.post('/topic/list', controller.topic.list);                      // 获取话题列表
    router.post('/topic/detail', controller.topic.detail);                  // 显示某个话题

    //reply
    router.post('/reply/add', controller.reply.add);                        // 新增回复
    router.post('/reply/edit', controller.reply.edit);                      // 编辑回复
    router.post('/reply/up', controller.reply.up);                          // 回复点赞
    router.post('/reply/delete', controller.reply.delete);                  // 删除回复

    //message
    router.post('/message', controller.message.index);                      // 显示消息

    /*router.post('/file/upload', controller.file.upload);                  // 单个文件上传
    router.post('/file/uploads', controller.file.uploads);                  // 多个文件上传
    router.post('/file/uploadStream', controller.file.uploadStream);        // stream形式
    router.post('/file/upload',controller.file.qiniuUpload);                // 七牛云存储
    router.post('/file/uploads',controller.file.qiniuUploads);              // 七牛云存储*/

    //search
    router.get('/search', controller.search.index);                         // 搜索
};
