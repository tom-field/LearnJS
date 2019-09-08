import Cookie from 'js-cookie';

export default {
    setUserInfo(state, data) {
        Cookie.set('userInfo', JSON.stringify(data), {expires: 7, path: ''})
        state.userInfo = data;
        //更新操作可以只传部分字段
        //Object.assign(state.userInfo,data);
    },
    clearUserInfo(state) {
        // 不加path,线上删除不掉
        Cookie.remove('userInfo', {path: ''});
        state.userInfo = {};
    },
    setLoading(state,data){
        Object.assign(state.loading,data);
    },
    setUnreadMessage(state,data){
        state.unreadMessage = data;
    }
}