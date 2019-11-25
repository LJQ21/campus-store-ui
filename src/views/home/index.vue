<template lang='pug'>
  #home-container
    van-nav-bar(title='校园二手商城')
    van-sticky
      van-search(placeholder='请输入搜索关键词' v-model='searchKey' @click='toSearch')
    // 顶部栏
      van-row.topbar
        van-col(span='2').topbar-tree
          van-icon(name='bars' size='20px')
          .topbar-tree_font 分类
        van-col(sapn='22')
          van-search(placeholder='请输入搜索关键词' v-model='searchKey' shape='round')
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
    van-card(num='2', price='2.00', desc='描述信息', title='商品标题', thumb='https://img.yzcdn.cn/vant/t-thirt.jpg')
      div(slot='tags')
        van-tag(plain='', type='danger') 标签
        van-tag(plain='', type='danger') 标签
    van-card(num='2', price='2.00', desc='描述信息', title='商品标题', thumb='https://img.yzcdn.cn/vant/t-thirt.jpg')
      div(slot='tags')
        van-tag(plain='', type='danger') 标签
        van-tag(plain='', type='danger') 标签
    van-card(num='2', price='2.00', desc='描述信息', title='商品标题', thumb='https://img.yzcdn.cn/vant/t-thirt.jpg')
      div(slot='tags')
        van-tag(plain='', type='danger') 标签
        van-tag(plain='', type='danger') 标签
    // van-sku(v-model='show' :sku='sku' :goods='goods')
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
      images: [
        'https://grithink.cn/upload/2019/10/wallhaven-g8171e-ebc82640c6f542d39060251e23f45941.png',
        'https://grithink.cn/upload/2019/10/wallhaven-017vm1-52fbb072750b4062b5efca1ce45980af.jpg'
      ],
      sku: {
        // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
        // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
        tree: [
          {
            k: '颜色', // skuKeyName：规格类目名称
            v: [
              {
                id: '30349', // skuValueId：规格值 id
                name: '红色', // skuValueName：规格值名称
                imgUrl: 'https://img.yzcdn.cn/1.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                previewImgUrl: 'https://img.yzcdn.cn/1p.jpg' // 用于预览显示的规格类目图片
              },
              {
                id: '1215',
                name: '蓝色',
                imgUrl: 'https://img.yzcdn.cn/2.jpg',
                previewImgUrl: 'https://img.yzcdn.cn/2p.jpg'
              }
            ],
            k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          }
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
            s2: '1193', // 规格类目 k_s 为 s2 的对应规格值 id
            s3: '0', // 最多包含3个规格值，为0表示不存在该规格
            stock_num: 110 // 当前 sku 组合对应的库存
          }
        ],
        price: '1.00', // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        messages: [
          {
            // 商品留言
            datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
            multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
            name: '留言', // 留言名称
            type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
            required: '1', // 是否必填 '1' 表示必填
            placeholder: '' // 可选值，占位文本
          }
        ],
        hide_stock: false // 是否隐藏剩余库存
      },
      goods: {
        // 商品标题
        title: '测试商品',
        // 默认商品 sku 缩略图
        picture: 'https://img.yzcdn.cn/1.jpg'
      }
    }
  },
  methods: {
    toSearch() {
      this.$router.push('/search')
    },
    toClassify() {
      this.$router.push('/classify')
    }
  }
}
</script>

<style lang="less" scoped>
#home-container {
  .topbar {
    width: 100%;
    .topbar-tree {
      margin: 9px 0 0 10px;
      &_font {
        font-size: 10px;
      }
    }
  }
  .swipe {
    .swipe-image {
      max-width: 400px;
    }
  }
}
</style>
