import Vue from 'vue'
import axios from 'axios'
import {Switch, Button, Divider, Badge} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Toasted from 'vue-toasted'
import App from './App'
import router from './router'
import store from './store'
import g from './utils/globel'
import db from './datastore'
import VueElectron from 'vue-electron'
import '@/assets/style/font.less'
import {theme, themeSetup} from './assets/theme/index.js'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(VueElectron)
Vue.use(Toasted)
Vue.component(Button.name, Button)
Vue.component(Switch.name, Switch)
Vue.component(Divider.name, Divider)
Vue.component(Badge.name, Badge)
Vue.config.productionTip = false
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$db = db
Vue.prototype.$g = g
/* eslint-disable no-new */

/** ------------------------------
                主题
 -------------------------------- */
Vue.themeSetup = Vue.prototype.$themeSetup = themeSetup
Vue.theme = Vue.prototype.$theme = theme

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
