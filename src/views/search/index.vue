<template lang='pug'>
  #search-container
    .search-header
      van-sticky
        van-search(placeholder='请输入搜索关键词' v-model='searchKey' @search='onSearch' show-action)
          dib(slot='label') 商品
          div(slot='action' @click='goBack') 返回
    .search-content
      van-card(v-for='product in products' :key='product.id' :num='product.num' :price='product.price' :desc='product.desc' :title='product.title' :thumb='product.thumb')
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      searchKey: '',
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
        }
      ]
    }
  },
  methods: {
    onSearch() {
      this.products.push({
        id: 3,
        num: '2',
        price: '2.00',
        desc: '描述信息',
        title: '商品标题',
        thumb: 'https://img.yzcdn.cn/vant/t-thirt.jpg'
      })
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
