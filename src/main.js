import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./store";
import toast from 'components/common/toast'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 使用懒加载插件
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

