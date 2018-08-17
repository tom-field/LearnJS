import Vue from 'vue';
import Vuex from 'vuex';
/* 引入模块 */
import userInfo from './modules/userInfo';

Vue.use(Vuex);

const vuex = new Vuex.Store({
    modules:{
        userInfo,
    }
})

export default vuex;
