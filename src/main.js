import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import Element, { Message } from 'element-ui'
import './assets/css/common.css'
// 将若干个export 导出的内容组合成一个对象返回给api
import * as api from './axios/api'
Vue.prototype.$api = api;
Vue.prototype.$message = Message
Vue.use(Element);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
