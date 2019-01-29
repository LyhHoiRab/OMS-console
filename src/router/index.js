import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Item from '@/components/item'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: Index,
  },{
    path: '/item',
    component: Item,
  }]
})
