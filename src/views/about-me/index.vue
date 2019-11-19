<template lang='pug'>
  #about-me
    van-nav-bar(title="标题" left-text="返回" right-text="按钮" left-arrow)
    Tabbar
</template>

<script>
import Tabbar from '_c/Tabbar/index'
export default {
  name: 'AboutMe',
  components: { Tabbar }
}
</script>

<style lang="less" scoped>

</style>
