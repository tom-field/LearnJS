import Vue from 'vue'
import Router from 'vue-router'
import subpage from '@/pages/page1/subpage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'subpage',
      component: subpage
    }
  ]
})
