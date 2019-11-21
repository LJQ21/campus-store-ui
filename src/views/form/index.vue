<template lang='pug'>
  #form
    van-cell-group
      van-field(v-model='goodsName' label='商品名称' placeholder='请输入用户名')
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      goodsName: ''
    }
  }
}
</script>

<style lang="less" scoped>

</style>
