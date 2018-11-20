const uuid = require('uuid');

const Service = require('egg').Service;

class UserService extends Service {
    /**
     * 新增用户
     * @param name
     * @param loginname
     * @param pass
     * @param email
     * @param avatar_url
     * @param active
     * @returns {Promise.<void>}
     */
    async newAndSave(name, loginname, pass, email, avatar_url, active) {
        const user = new this.ctx.model.User();
        user.name = name;
        user.loginname = loginname;
        user.pass = pass;
        user.email = email;
        user.avatar = avatar_url;
        user.active = active || false;
        user.accessToken = uuid.v4();

        return user.save();
    }

    /*
   * 根据用户ID，查找用户
   * @param {String} id 用户ID
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
    async getUserById(id) {
        if (!id) {
            return null;
        }
        return this.ctx.model.User.findOne({_id: id}).exec();
    }

    /*
   * 根据 token 查找用户
   * @param {String} token
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
    getUserByToken(accessToken) {
        const query = { accessToken };
        return this.ctx.model.User.findOne(query).exec();
    }

    /*
   * 根据用户名列表查找用户列表
   * @param {Array} names 用户名列表
   * @return {Promise[users]} 承载用户列表的 Promise 对象
   */
    async getUsersByNames(names) {
        if (names.length === 0) {
            return [];
        }
        const query = { loginname: { $in: names } };
        return this.ctx.model.User.find(query).exec();
    }

    /*
   * 根据登录名查找用户
   * @param {String} loginName 登录名
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
    async getUserByLoginName(loginName) {
        const query = {loginname: new RegExp('^' + loginName + '$', 'i')};
        return this.ctx.model.User.findOne(query).exec();
    }

    async getUsersByQuery(query, opt) {
        return this.ctx.model.User.find(query, '', opt).exec();
    }

    /**
     * 获取关键词搜索到的用户数量
     * @param query
     * @returns {Promise.<Array|{index: number, input: string}>}
     */
    async getCountByQuery(query) {
        return this.ctx.model.User.count(query).exec();
    }

    /**
     * 评论加5分
     */
    async incrementScoreAndCommentCount(id,score,replyCount){
        const query = {_id:id};
        const update = {$inc:{score,comment_count:replyCount}};
        return this.ctx.model.User.findByIdAndUpdate(query,update).exec();
    }

    /**
     * 回复加2分
     * @param id
     * @param score
     * @param replyCount
     * @returns {Promise.<Array|{index: number, input: string}>}
     */
    async incrementScoreAndReplyCount(id,score,replyCount){
        const query = {_id:id};
        const update = {$inc:{score,reply_count:replyCount}};
        return this.ctx.model.User.findByIdAndUpdate(query,update).exec();
    }

    /*
    * 更新用户信息
    * */
    async updateUserInfo(id,info){
        const query = {_id:id};
        return this.ctx.model.User.findByIdAndUpdate(query,info).exec();
    }

    /**
     * 根据 githubId 查找用户
     * @param githubId 登录名
     * @returns {Array|{index: number, input: string}}
     */
    getUserByGithubId(githubId) {
        const query = { githubId };
        return this.ctx.model.User.findOne(query).exec();
    }

    /**
     * 收藏数增长
     * @param id
     * @returns {Array|{index: number, input: string}}
     */
    incrementCollectTopicCount(id) {
        const query = { _id: id };
        const update = { $inc: { collect_topic_count: 1 } };
        return this.ctx.model.User.findByIdAndUpdate(query, update).exec();
    }
}

module.exports = UserService