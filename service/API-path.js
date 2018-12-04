const API_PREFIX = process.env.API_PREFIX;

const API_PATH = {
  //用户接口
  user: {
    signin: `${API_PREFIX}/sign/signin`,
    signup: `${API_PREFIX}/sign/signup`,
    signout: `${API_PREFIX}/sign/signout`,
    getUserByToken: `${API_PREFIX}/sign/getUserByToken`,
    activeAccount: `${API_PREFIX}/active_account`,
    updateAvatar: `${API_PREFIX}/user/updateAvatar`,
    detail: `${API_PREFIX}/user/detail`,
    updateInfo: `${API_PREFIX}/user/updateInfo`,
    updatePassword: `${API_PREFIX}/user/updatePassword`,
    topUsers: `${API_PREFIX}/user/topUsers`,
  },
  //tab
  tab: {
    index: `${API_PREFIX}/tab/index`,
  },
  /*消息通知*/
  message: {
    getList: `${API_PREFIX}/message`,
    unreadCount: `${API_PREFIX}/message/unreadCount`,
    mark_all: `${API_PREFIX}/message/mark_all`,
    mark_one: `${API_PREFIX}/message/mark_one`,
  },
  /*主题*/
  topic: {
    create: `${API_PREFIX}/topic/create`,
    up: `${API_PREFIX}/topic/up`,
    collect: `${API_PREFIX}/topic/collect`,
    collectedTopics: `${API_PREFIX}/topic/collectedTopics`,
    cancelCollect: `${API_PREFIX}/topic/cancelCollect`,
    update: `${API_PREFIX}/topic/update`,
    delete: `${API_PREFIX}/topic/delete`,
    list: `${API_PREFIX}/topic/list`,
    detail: `${API_PREFIX}/topic/detail`,
    todayHotTopics: `${API_PREFIX}/topic/todayHotTopics`,
  },
  /*评论*/
  comment: {
    add: `${API_PREFIX}/comment/add`,
    edit: `${API_PREFIX}/comment/edit`,
    up: `${API_PREFIX}/comment/up`,
    delete: `${API_PREFIX}/comment/delete`,
  },
  /*回复*/
  reply: {
    add: `${API_PREFIX}/reply/add`,
    edit: `${API_PREFIX}/reply/edit`,
    up: `${API_PREFIX}/reply/up`,
    delete: `${API_PREFIX}/reply/delete`,
  },
  /*上传*/
  file: {
    upload: `${API_PREFIX}/file/upload`,
  }
}

export default API_PATH;
