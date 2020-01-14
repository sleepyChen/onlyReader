import Vue from 'vue'

import App from './App.vue'

import Router from 'vue-router'
import router from './router'

import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

import BaiduMap from 'vue-baidu-map'


import 'lib-flexible/flexible'

Vue.config.productionTip = false


import {
  CellGroup,
  Field,
  Button,
  Toast,
  Checkbox,
  Tabbar,
  TabbarItem,
  Search,
  Tab,
  Tabs,
  Cell,
  NavBar,
  Icon,
  SubmitBar,
  Swipe,
  SwipeItem,
  Overlay,
  Dialog,
  PullRefresh,
  Uploader,
  Popup,
  Picker
} from 'vant'

Vue
  .use(BaiduMap,{
    ak: 'Ggx0L2L36Mf9Qft5wpzWABwkFokwSVCM'
  })
  .use(VueAxios, axios)
  .use(CellGroup)
  .use(Field)
  .use(Button)
  .use(Toast)
  .use(Checkbox)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(Tabs)
  .use(Tab)
  .use(Cell)
  .use(NavBar)
  .use(Icon)
  .use(SubmitBar)
  .use(Swipe)
  .use(SwipeItem)
  .use(Overlay)
  .use(Dialog)
  .use(PullRefresh)
  .use(Uploader)
  .use(Popup)
  .use(Picker)
  

// 阻止路由重复点击错误问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
