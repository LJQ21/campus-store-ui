import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '_lib/Animate/animate.min.css'
import '@/permission.js'
import Vuelidate from 'vuelidate' // 引入表单验证
import { Notify, Tabbar, TabbarItem, NavBar, Button, Row, Col, Cell, CellGroup, Icon, Checkbox, CheckboxGroup, Card, SubmitBar, CountDown, Step, Steps, Search, Swipe, SwipeItem, Lazyload, Sku, Tag, Grid, GridItem, Image, Divider, Sticky, Field, Picker, Popup, Uploader, Sidebar, SidebarItem, GoodsAction, GoodsActionIcon, GoodsActionButton, Skeleton, Loading } from 'vant'

Vue
  .use(Vuelidate)
  .use(Notify)
  .use(Tabbar).use(TabbarItem)
  .use(NavBar)
  .use(Button)
  .use(Row).use(Col)
  .use(Cell).use(CellGroup)
  .use(Icon)
  .use(Checkbox).use(CheckboxGroup)
  .use(Card)
  .use(SubmitBar)
  .use(CountDown)
  .use(Step).use(Steps)
  .use(Search)
  .use(Swipe).use(SwipeItem)
// options 为可选参数，无则不传
  .use(Lazyload)
  .use(Sku)
  .use(Tag)
  .use(Grid).use(GridItem)
  .use(Image)
  .use(Divider) // 分割线
  .use(Sticky)
  .use(Field) // 输入框
  .use(Picker) // 选择器
  .use(Popup) // 弹出层
  .use(Uploader) // 文件上传
  .use(Sidebar)
  .use(SidebarItem) // 侧边导航栏
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Skeleton) // 骨架层
  .use(Loading) // 加载

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
