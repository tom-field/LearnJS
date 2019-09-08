import Vue from 'vue';
import Router from 'vue-router';

const Test = resolve => require(['@/pages/test/test.vue'], resolve)
const NotFound = resolve => require(['@/components/404/404'], resolve)
const Login = resolve => require(['@/pages/login/login.vue'], resolve)
const Home = resolve => require(['@/pages/home/home.vue'], resolve)


Vue.use(Router);

export default new Router({
  /*mode: 'history',*/
  routes: [
    {
      path:'/404',
      name: '',
      component: NotFound,
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta:{
        title:'首页',
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta:{
        title:'登录',
      }
    },
    {
      path: '/',
      redirect : {
        path: '/home',
      }
    },
    {
      path: '*',
      redirect : {
        path: '/404',
      }
    }
  ]
})
