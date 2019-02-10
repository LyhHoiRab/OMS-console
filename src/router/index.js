import Vue         from 'vue'
import Router      from 'vue-router'
import Welcome     from '@/components/Welcome'
import Item        from '@/components/Item'
import ProductEdit from '@/components/ProductEdit'
import Wechat      from '@/components/Wechat'
import WechatEdit  from '@/components/WechatEdit'
import Sales       from '@/components/Sales'
import SalesEdit   from '@/components/SalesEdit'
import Role        from '@/components/Role'
import Function    from '@/components/Function'

Vue.use(Router)

export default new Router({
  routes: [{
    path      : '/',
    component : Welcome,
  },{
    path      : '/item',
    component : Item,
  },{
    path      : '/product/:id',
    component : ProductEdit,
  },{
    path      : '/wechat',
    component : Wechat,
  },{
    path       : '/wechat/add',
    component  : WechatEdit,
  },{
    path       : '/wechat/:id',
    component  : WechatEdit,
  },{
    path       : '/sales',
    component  : Sales,
  },{
    path       : '/sales/add',
    component  : SalesEdit,
  },{
    path       : '/sales/:accountId',
    component  : SalesEdit,
  },{
    path       : '/role',
    component  : Role,
  },{
    path       : '/function',
    component  : Function,
  }]
})
