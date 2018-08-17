/*
import Cookie from '../../../static/js/cookie';

export default {
    state: {
        userId: null,
        group: null,
        loginName: null,
        name: null,
    },

    getters: {
        GETUSERINFO: (state) => {
            if(!state.userId){
                if(Cookie.get('userInfo')){
                    let userInfo = JSON.parse(Cookie.get('userInfo'));
                    Object.assign(state,userInfo);
                }
            }
            return state;
        },
    },
    mutations: {
        SETUSERINFO: (state,userInfo) => {
            Cookie.set('userInfo', JSON.stringify(userInfo));
            Object.assign(state,userInfo);
        },
        CLEARUSERINFO: (state) => {
            Cookie.del('userInfo');
            Object.assign(state,{
                userId: null,
                group: null,
                loginName: null,
                name: null,
            })
        }
    },
    actions: {
        USERSIGNIN: ({commit}, userInfo) => {
            commit('SETUSERINFO',userInfo);
        },
        USERSIGNOUT: ({commit}, userInfo) => {
            commit('CLEARUSERINFO',userInfo);
        },
    },
}*/
