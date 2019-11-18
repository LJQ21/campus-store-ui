import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import 'mint-ui/lib/style.css'
import '_lib/Animate/animate.min.css'
import Vuelidate from 'vuelidate' // 引入表单验证

import { Header, Button } from 'mint-ui'

Vue.config.productionTip = false

Vue.component(Button.name, Button)
Vue.component(Header.name, Header)

Vue.use(Vuelidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
