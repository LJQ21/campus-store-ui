<template lang='pug'>
  #home-container
    .home-header
      van-nav-bar(title='校园二手商城')
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
        van-card(:num='product.num' :price='product.price' :desc='product.desc' :title='product.title' :thumb='product.thumb[0]' @click='toDetails(product)')
          div(slot='tags')
            van-tag(plain type='danger') 标签
            van-tag(plain type='danger') 标签
    .home-btmnar
      // 底部导航
      Tabbar(:tabNum='tabNum')
</template>

<script>
import Tabbar from '_c/Tabbar/index'
export default {
  name: 'Home',
  components: {
    Tabbar
  },
  data() {
    return {
      show: true,
      tabNum: 0,
      searchKey: '',
      products: [
        {
          num: '2',
          price: '2.00',
          desc: '描述',
          title: '标题',
          thumb: ['https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg', 'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg'],
          express: '免运费',
          remain: '2'
        },
        {
          num: '2',
          price: '2.00',
          desc: '描述',
          title: '标题',
          thumb: ['https://img.yzcdn.cn/vant/t-thirt.jpg']
        },
        {
          num: '2',
          price: '2.00',
          desc: '描述',
          title: '标题',
          thumb: ['https://img.yzcdn.cn/vant/t-thirt.jpg']
        },
        {
          num: '2',
          price: '2.00',
          desc: '描述',
          title: '标题',
          thumb: ['https://img.yzcdn.cn/vant/t-thirt.jpg']
        }
      ],
      images: [
        'https://grithink.cn/upload/2019/10/wallhaven-g8171e-ebc82640c6f542d39060251e23f45941.png',
        'https://grithink.cn/upload/2019/10/wallhaven-017vm1-52fbb072750b4062b5efca1ce45980af.jpg'
      ]
    }
  },
  methods: {
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
            num: product.num,
            price: product.price,
            desc: product.desc,
            title: product.title,
            thumb: product.thumb,
            express: product.express,
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
