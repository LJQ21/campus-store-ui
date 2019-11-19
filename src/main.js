import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '_lib/Animate/animate.min.css'
import Vuelidate from 'vuelidate' // 引入表单验证
import { Notify, Tabbar, TabbarItem, NavBar } from 'vant'

Vue.use(Tabbar).use(TabbarItem)
Vue.use(Vuelidate)
Vue.use(Notify)
Vue.use(NavBar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
