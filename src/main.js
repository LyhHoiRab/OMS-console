import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI, {locale})

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
