import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Test = {
  template: `<div>Hello Wah !!</div>`
}

export default new Router({
  routes: [{
      path: '/',
      component: Test,
  }]
})
