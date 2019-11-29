<template lang='pug'>
  #home-container
    .home-header
      van-nav-bar(title='校园二手商城')
        .home-header-left(slot='left' @click='selectSchool')
          van-icon(name='location-o')
          span [贵民大]
      van-sticky
        van-search(placeholder='请输入搜索关键词' v-model='searchKey' @click='toSearch')
    .home-content
      // 轮播图
      van-swipe.swipe(:autoplay='3000')
        van-swipe-item(v-for='(image, index) in images', :key='index')
          img.swipe-image(v-lazy='image')
      // 分类
      van-grid(:column-num='3')
        van-grid-item(icon='photo-o', text='四级')
        van-grid-item(icon='photo-o', text='软考')
        van-grid-item(icon='photo-o', text='二级')
        van-grid-item(icon='photo-o', text='会计')
        van-grid-item(icon='photo-o', text='教资')
        van-grid-item(icon='ellipsis', text='分类' @click='toClassify')
      van-divider 今日推荐
      van-grid(:border='false', :column-num='3')
        van-grid-item
          van-image(src='https://grithink.cn/upload/2019/10/wallhaven-g8171e-ebc82640c6f542d39060251e23f45941.png')
        van-grid-item
          van-image(src='https://grithink.cn/upload/2019/10/wallhaven-qdowjr-6a99eed676c34b2084b69495d0020109.jpg')
        van-grid-item
          van-image(src='https://grithink.cn/upload/2019/10/wallhaven-392lk9-b28902d03a154aa58de4ac69d2f47174.jpg')
      van-divider 最新
      // 商品展示
      .home-goods-list(v-for='product in products')
        van-skeleton(name avatar avatar-size='90px' avatar-shape='square' :row='2' :loading='loading')
          van-card(:num='product.count' :price='product.sellPrice' :origin-price='product.purchasePrice' :desc='product.des' :title='product.name' :thumb='product.img' @click='toDetails(product)')
            div(slot='tags')
            //
              van-tag(plain type='danger') 标签
              van-tag(plain type='danger') 标签
    .home-btmnar
      // 底部导航
      Tabbar(:tabNum='tabNum')
</template>

<script>
import { getAllProducts } from '_api/product'
import Tabbar from '_c/Tabbar/index'
export default {
  name: 'Home',
  components: {
    Tabbar
  },
  data() {
    return {
      show: true,
      loading: false,
      tabNum: 0,
      searchKey: '',
      products: [],
      images: [
        'https://grithink.cn/upload/2019/10/wallhaven-g8171e-ebc82640c6f542d39060251e23f45941.png',
        'https://grithink.cn/upload/2019/10/wallhaven-017vm1-52fbb072750b4062b5efca1ce45980af.jpg'
      ]
    }
  },
  created() {
    this.getAllProducts()
  },
  methods: {
    getAllProducts() {
      this.loading = true
      getAllProducts().then(response => {
        const { data } = response
        this.products = data.data.products
        console.log(this.products)
        this.loading = false
      })
    },
    toSearch() {
      this.$router.push('/search')
    },
    toClassify() {
      this.$router.push('/classify')
    },
    toDetails(product) {
      this.$router.push(
        {
          path: '/details',
          query: {
            count: product.count,
            sellPrice: product.sellPrice,
            des: product.des,
            name: product.name,
            img: product.img,
            purchasePrice: product.purchasePrice,
            remain: product.remain
          }
        }
      )
    }
  }
}
</script>

<style lang="less" scoped>
#home-container {
  .home-content {
    margin-bottom: 50px;
    .swipe {
      .swipe-image {
        width: 100%;
        display: block;
      }
    }
  }
}
</style>
