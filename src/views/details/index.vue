<template lang='pug'>
  #details-container
    .details-header
      van-sticky
        van-nav-bar(title='详情' left-text='返回' left-arrow @click-left='goback')
    .details-content
      // 商品图片
      van-swipe.goods-swipe(:autoplay='3000')
        van-swipe-item(v-for='thumb in goods.thumb', :key='thumb')
          img.goods-swipe-img(:src='thumb')
      // 商品信息
      van-cell-group
        van-cell
          .goods-title {{ goods.title }}
          .goods-price {{ formatPrice(goods.price) }}
        van-cell.goods-express
          van-col(span='10') 运费：{{ goods.express }}
          van-col(span='14') 剩余：{{ goods.remain }}
    .details-btmnar
      // 商品底部栏
      van-goods-action
        van-goods-action-icon(icon='chat-o', @click='sorry')
          | 客服
        van-goods-action-icon(icon='cart-o', @click='goCart')
          | 购物车
        van-goods-action-button(type='warning', @click='addToCart')
          | 加入购物车
        van-goods-action-button(type='danger', @click='buyGoods')
          | 立即购买
</template>

<script>
export default {
  name: 'Details',
  data() {
    return {
      goods: this.$route.query.product
    }
  },
  methods: {
    test() {
      console.log(this.goods.thumb)
    },
    formatPrice() {
      return '¥' + (this.goods.price / 100).toFixed(2)
    },
    goback() {
      this.$router.go(-1)
    },
    goCart() {
      this.$router.push('/cart')
    },
    addToCart() {
      // 添加到购物车
    },
    buyGoods() {
      // 调用购买商品接口
    }
  }
}
</script>

<style lang="less" scoped>
#details-container {
  .goods {
    &-swipe-img {
      width: 100%;
      display: block;
    }
    &-title {
    font-size: 16px;
    }
    &-price {
      color: #f44;
    }
    &-express {
      color: #999;
      font-size: 12px;
      padding: 5px 15px;
    }
    &-cell-group {
      margin: 15px 0;
      .van-cell__value {
        color: #999;
      }
    }
    &-tag {
      margin-left: 5px;
    }
  }
}
</style>
