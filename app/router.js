'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
//路由控制给到前端,后端使用post请求
module.exports = app => {
    const {router, controller, config, middleware} = app;
    const prefix = '/dir-ws';

    //中间件
    const userRequired = middleware.userRequired();

    // auth2.0 认证
    router.get(`${prefix}/auth`, controller.auth.index);
    app.passport.mount('weibo');
    //app.passport.mount('github');
    app.passport.mount('github',{
        loginURL: `${prefix}/passport/github`,
        callbackURL: `${prefix}/passport/github/callback`,
        successReturnToOrRedirect: `${prefix}/auth`,
    });
    app.passport.mount('google', {
        scope: ['email', 'profile', 'openid'],
        loginURL: `${prefix}/passport/google`,
        callbackURL: `${prefix}/passport/google/callback`,
        successReturnToOrRedirect: `${prefix}/auth`,
    });
    app.passport.mount('bitbucket');
    app.passport.mount('twitter');

    router.post('/news', controller.news.list);

    //登录登出等
    router.post(`${prefix}/sign/signup`, controller.sign.signup);                    // 注册
    router.post(`${prefix}/active_account`, controller.sign.activeAccount);          // 激活
    router.post(`${prefix}/sign/signin`, controller.sign.signin);                    // 本地登录
    router.post(`${prefix}/reset_pass`, controller.sign.updatePass);                 // 更新密码
    router.post(`${prefix}/sign/signout`, controller.sign.signout);                  // 退出
    router.post(`${prefix}/sign/getUserByToken`, controller.sign.getUserByToken);    // 根据token获取用户信息

    //user
    router.post(`${prefix}/user/updateAvatar`, controller.user.updateAvatar);         // 更新头像
    router.post(`${prefix}/user/updatePassword`, controller.user.updatePassword);     // 更新密码
    router.post(`${prefix}/user/updateInfo`, controller.user.updateInfo);             // 更新信息
    router.post(`${prefix}/user/detail`, controller.user.index);                      // 获取用户信息
    router.post(`${prefix}/user/topics`, controller.user.listTopics);                 // 用户发布的所有话题页
    router.post(`${prefix}/user/replies`, controller.user.listReplies);               // 用户参与的所有回复页
    router.post(`${prefix}/user/topUsers`, controller.user.topUsers);                           // 积分排名

    //tab
    router.post(prefix + '/tab/index', controller.tab.index);                              //获取tab;

    //topic
    router.post(`${prefix}/topic/uploadImg`, controller.topic.uploadImg);                       // 发布话题
    router.post(`${prefix}/topic/create`, controller.topic.publish);                       // 发布话题
    router.post(`${prefix}/topic/up`, controller.topic.up);                                // 点赞话题
    router.post(`${prefix}/topic/collect`, controller.topic.collect);                      // 收藏话题
    router.post(`${prefix}/topic/collectedTopics`, controller.topic.collectedTopics);      // 收藏话题
    router.post(`${prefix}/topic/cancelCollect`, controller.topic.cancelCollect);          // 取消收藏
    router.post(`${prefix}/topic/update`, controller.topic.update);                        // 更新话题
    router.post(`${prefix}/topic/delete`, controller.topic.delete);                        // 删除话题
    router.post(`${prefix}/topic/list`, controller.topic.list);                            // 获取话题列表
    router.post(`${prefix}/topic/getRecentTopics`, controller.topic.getRecentTopics);      // 获取最近话题列表
    router.post(`${prefix}/topic/todayHotTopics`, controller.topic.todayHotTopics);        // 今日热议
    router.post(`${prefix}/topic/detail`, controller.topic.detail);                        // 显示某个话题

    //comment
    router.post(`${prefix}/comment/add`, controller.comment.add);                        // 新增评论
    router.post(`${prefix}/comment/edit`, controller.comment.edit);                      // 编辑评论
    router.post(`${prefix}/comment/up`, controller.comment.up);                          // 点赞评论
    router.post(`${prefix}/comment/delete`, controller.comment.delete);                  // 删除评论

    //reply
    router.post(`${prefix}/reply/add`, controller.reply.add);                        // 新增回复
    router.post(`${prefix}/reply/edit`, controller.reply.edit);                      // 编辑回复
    router.post(`${prefix}/reply/up`, controller.reply.up);                          // 回复点赞
    router.post(`${prefix}/reply/delete`, controller.reply.delete);                  // 删除回复

    //message
    router.post(`${prefix}/message`, controller.message.index);                      // 显示消息
    router.post(`${prefix}/message/unreadCount`, controller.message.unreadCount);    // 未读消息

    //statistics
    router.post(`${prefix}/statistics`, controller.statistics.index);                      // 显示消息

    //router.post('/file/upload', controller.file.upload);                           // 单个文件上传
    //router.post('/file/uploads', controller.file.uploads);                           // 多个文件上传
    //router.post('/file/uploadStream', controller.file.uploadStream);                 // stream形式
    //router.post('/file/upload',controller.file.qiniuUpload);                         // 七牛云存储
    //router.post('/file/uploads',controller.file.qiniuUploads);                       // 七牛云存储

    //search
    router.get(`${prefix}//search`, controller.search.index);                         // 搜索
};
