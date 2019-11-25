<template lang='pug'>
  #classify-container
    .classify-header
      van-sticky
        van-nav-bar(title='标题' left-text='返回' right-text='按钮' left-arrow @click-left='onClickLeft' @click-right='onClickRight')
    .classify-content
      .classify-sidebar
        van-sidebar(v-model='activeKey')
          van-sidebar-item(title='英语四级')
          van-sidebar-item(title='计机二级')
          van-sidebar-item(title='软件设计师')
      .classify-main
        van-card(v-for='product in products' :key='product.id' :num='product.num' :price='product.price' :desc='product.desc' :title='product.title' :thumb='product.thumb')
</template>

<script>
export default {
  name: 'Classify',
  data() {
    return {
      activeKey: 0,
      products: [
        {
          id: 1,
          num: '2',
          price: '2.00',
          desc: '描述信息',
          title: '商品标题',
          thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg'
        },
        {
          id: 2,
          num: '2',
          price: '2.00',
          desc: '描述信息',
          title: '商品标题',
          thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg'
        },
        {
          id: 3,
          num: '2',
          price: '2.00',
          desc: '描述信息',
          title: '商品标题',
          thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg'
        },
        {
          id: 4,
          num: '2',
          price: '2.00',
          desc: '描述信息',
          title: '商品标题',
          thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg'
        },
        {
          id: 5,
          num: '2',
          price: '2.00',
          desc: '描述信息',
          title: '商品标题',
          thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg'
        },
        {
          id: 6,
          num: '2',
          price: '2.00',
          desc: '描述信息',
          title: '商品标题',
          thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg'
        },
        {
          id: 7,
          num: '2',
          price: '2.00',
          desc: '描述信息',
          title: '商品标题',
          thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg'
        }
      ]
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {

    }
  }
}
</script>

<style lang="less" scoped>
#classify-container {
  .classify-content {
    display: flex;
    justify-content: center;
    .classify-main {
      width: 100%;
    }
  }
}
</style>
