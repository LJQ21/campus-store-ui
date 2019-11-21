import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '_lib/Animate/animate.min.css'
import Vuelidate from 'vuelidate' // 引入表单验证
import { Notify, Tabbar, TabbarItem, NavBar, Button, Row, Col, Cell, CellGroup, Icon, Checkbox, CheckboxGroup, Card, SubmitBar, CountDown, Step, Steps, Search, Swipe, SwipeItem, Lazyload, Sku, Tag, Grid, GridItem, Image, Divider, Sticky, Field, Picker, Popup, Uploader } from 'vant'

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
Vue.use(CountDown)
Vue.use(Step).use(Steps)
Vue.use(Search)
Vue.use(Swipe).use(SwipeItem)
// options 为可选参数，无则不传
Vue.use(Lazyload)
Vue.use(Sku)
Vue.use(Tag)
Vue.use(Grid).use(GridItem)
Vue.use(Image)
Vue.use(Divider) // 分割线
Vue.use(Sticky)
Vue.use(Field) // 输入框
Vue.use(Picker) // 选择器
Vue.use(Popup) // 弹出层
Vue.use(Uploader) // 文件上传

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
