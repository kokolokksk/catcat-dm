import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'landing-page',
      redirect: '/home'
      // component: require('@/components/Application').default
    },
    {
      path: '/home',
      name: 'landing-page',
      redirect: '/home/setting',
      component: require('@/components/Application').default,
      children:[{
        path: '/home/setting',
        name: 'setting',
        meta: {
          // 页面标题title
          title: 'CatCatDM',
          icon: '../../logo.png'
        },
        component: require('@/components/SettingWindowPage').default
      }]
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
      path: '/dmWindow',
      name: 'dmWindow',
      meta: {
        // 页面标题title
        title: '弹幕'
      },
      component: require('@/components/ChatDomPage').default
    },
    {
      path: '/settingTTS',
      name: 'settingTTSWindow',
      meta: {
        // 页面标题title
        title: 'TTS'
      },
      component: require('@/components/TTSSettingPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
