import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css';
import Element, { Message, MessageBox } from 'element-ui'
import './assets/css/common.css'
// 将若干个export 导出的内容组合成一个对象返回给api
import * as api from './axios/api'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)
Vue.prototype.$api = api;
Vue.prototype.$message = Message
Vue.prototype.$messagebox = MessageBox;
Vue.use(Element);
Vue.use(Vuex);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
