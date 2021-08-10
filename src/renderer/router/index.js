import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/ChatRoomPage').default
    },
    {
      path: '/settingWindow',
      name: 'settingWindow',
      component: require('@/components/SettingWindowPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
