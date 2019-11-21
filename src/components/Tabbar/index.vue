<template lang='pug'>
  #tabbar
    van-tabbar(v-model='active')
      van-tabbar-item(icon='home-o' repacle to='/home') 首页
      van-tabbar-item(icon='share') 漂流角
      van-tabbar-item(icon='add-o' repacle to='/form') 发布
      van-tabbar-item(icon='shopping-cart-o' repacle to='/cart') 购物车
      van-tabbar-item(icon='contact' repacle to='/mime') 我的
</template>

<script>
export default {
  name: 'Tabbar',
  props: {
    tabNum: Number
  },
  data() {
    return {
      active: this.tabNum
    }
  }
}
</script>

<style lang="less" scoped>
</style>
