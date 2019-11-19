<template lang='pug'>
  #tabbar
    van-tabbar(v-model='active')
      van-tabbar-item(icon='home-o') 标签
      van-tabbar-item(icon='search' info='5') 标签
      van-tabbar-item(icon='friends-o') 标签
      van-tabbar-item(icon='setting-o') 标签
</template>

<script>
export default {
  name: 'Tabbar',
  data() {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>

</style>
