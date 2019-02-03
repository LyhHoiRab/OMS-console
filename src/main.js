import Vue               from 'vue'
import router            from './router'
import ElementUI         from 'element-ui'
import locale            from 'element-ui/lib/locale/lang/zh-CN'
import App               from './App'
import {library}         from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {fas}             from '@fortawesome/free-solid-svg-icons'
import {fab}             from '@fortawesome/free-brands-svg-icons'
import {far}             from '@fortawesome/free-regular-svg-icons'

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'

library.add(fas, fab, far)

Vue.use(ElementUI, {locale})
Vue.component('font-awesome-icon', FontAwesomeIcon)

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>',
})
