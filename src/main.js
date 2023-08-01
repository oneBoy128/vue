import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import router from './router/index'
import store from './store/index'
import animate from 'animate.css'
import {WOW} from 'wowjs'
import Meta from 'vue-meta';


Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(animate)
Vue.use(Meta, {
  keyName: 'metaInfo', // 定义 Vue Meta 在组件中存放页面信息的属性名，默认是 metaInfo
});
Vue.prototype.$wow = new WOW({
  live:false,
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')