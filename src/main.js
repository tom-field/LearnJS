// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/router'
import './styles/index.scss'
import 'lib-flexible'

Vue.config.productionTip = false;

import store from 'store';
import Cookie from 'js-cookie';
import vuex from './vuex';

window.store = store;
window.Cookie = Cookie;

/*全局路由拦截器逻辑*/
/*router.beforeEach((to, from, next) => {
  let userInfo;
  const cookie_userInfo = Cookie.get('userInfo');
  if (cookie_userInfo) {
    userInfo = JSON.parse(cookie_userInfo);
  }
});*/

/* eslint-disable no-new */
/*window.vueVm = new Vue({
  el: '#app',
  router,
  vuex,
  components: {App},
  template: '<App/>'
})*/

window.vueVm = new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
