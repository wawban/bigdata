import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  // mode: 'history',
  routes: [
    //   {
    //     path: '/',
    //     name: 'HelloWorld',
    //     component: HelloWorld
    //   }

    //   {
    //     path: '/statistical',
    //     name: 'statistical',
    //     meta: {
    //         title: '$t:page.login.title'
    //     },
    //     component: () => import('@/pages/equipment/statistical')
    // },

    {
      path: '/',
      redirect: '/aiotsm',
      // path: '/bigdata',
      // component: () => import('@/pages')
    },
    {
      path: '/aiotsm',
      // path: '/',
      // redirect: '/bigdata',
      component: () => import('@/pages')
    },
    {
      path: '/preview',
      component: () => import('@/pages/preview')
    },
    // {
    //   path: '/dhpreview',
    //   component: () => import('@/pages/dhpreview')
    // }









  ]
})
