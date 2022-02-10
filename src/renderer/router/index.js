import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/ChatDomPage').default
    },
    {
      path: '/settingWindow',
      name: 'settingWindow',
      meta: {
        // 页面标题title
        title: '设置'
      },
      component: require('@/components/SettingWindowPage').default
    },
    {
      path: '/chatWindow',
      name: 'chatWindow',
      meta: {
        // 页面标题title
        title: 'send'
      },
      component: require('@/components/ChatWindowPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
