const Service = require('egg').Service;

class UserService extends Service {
    /*
   * 根据用户ID，查找用户
   * @param {String} id 用户ID
   * @return {Promise[user]} 承载用户的 Promise 对象
   */
    async getUserById(id) {
        if (!id) {
            return null;
        }

        return this.ctx.model.User.findOne({ _id: id }).exec();
    }
}

module.exports = UserService