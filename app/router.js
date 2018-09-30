'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);
    router.get('/news', controller.news.list);
    router.get('/user/:name', controller.user.index);                      // 获取用户信息
    router.get('/user/:name/topics', controller.user.listTopics);          // 用户发布的所有话题页
    router.get('/user/:name/replies', controller.user.listReplies);        // 用户参与的所有回复页
    router.get('/users/top100', controller.user.top100);                   // 显示积分前一百用户页
    router.get('/list', controller.topic.list);                            // 获取话题列表
    router.get('/list/:tid', controller.topic.index);                      // 显示某个话题
    router.get('/search', controller.search.index);                        // 搜索
};
