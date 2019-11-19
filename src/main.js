import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '_lib/Animate/animate.min.css'
import Vuelidate from 'vuelidate' // 引入表单验证
import { Notify, Tabbar, TabbarItem, NavBar, Button, Row, Col, Cell, CellGroup, Icon, Checkbox, CheckboxGroup, Card, SubmitBar } from 'vant'

Vue.use(Vuelidate)
Vue.use(Notify)
Vue.use(Tabbar).use(TabbarItem)
Vue.use(NavBar)
Vue.use(Button)
Vue.use(Row).use(Col)
Vue.use(Cell).use(CellGroup)
Vue.use(Icon)
Vue.use(Checkbox).use(CheckboxGroup)
Vue.use(Card)
Vue.use(SubmitBar)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
