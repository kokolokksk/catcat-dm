import Vue from 'vue'
import axios from 'axios'
import {Switch, Button} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import App from './App'
import router from './router'
import store from './store'
import g from './utils/globel'
import db from './datastore'
import VueElectron from 'vue-electron'
import '@/assets/style/font.less'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(VueElectron)
Vue.component(Button.name, Button)
Vue.component(Switch.name, Switch)
Vue.config.productionTip = false
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$db = db
Vue.prototype.$g = g
/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
