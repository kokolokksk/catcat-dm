import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import g from './utils/globel'
import db from './datastore'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueElectron from 'vue-electron'
import '@/assets/style/font.less'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.use(VueElectron)
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.prototype.$db = db
Vue.prototype.$g = g
Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
