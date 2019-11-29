<template lang='pug'>
  #list-address-container
    .list-address-header
      van-nav-bar(title='地址列表' left-text='返回' right-text='按钮' left-arrow @click-left='onClickLeft' @click-right='onClickRight')
    .list-address-content
</template>

<script>
export default {
  name: 'ListAdress'
}
</script>

<style lang='less' scoped>

</style>
