import Vue from 'vue';
import Vuex from 'vuex';
/* 引入模块 */
//import userInfo from './modules/userInfo';

import state from './states';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

const store = () => new Vuex.Store({
    /*modules:{
        userInfo,
    },*/
    state,
    getters,
    mutations,
    actions
})

export default store;
