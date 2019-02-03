import Vue     from 'vue'
import Router  from 'vue-router'
import Welcome from '@/components/Welcome'
import Item    from '@/components/Item'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Welcome,
  },{
    path: '/item',
    component: Item,
  }]
})
