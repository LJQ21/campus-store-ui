<template lang='pug'>
  #cart-container
    .cart-hearder
      van-sticky
        van-nav-bar(title='详情' left-text='返回' left-arrow :right-text='titleRight' @click-left='goback' @click-right='showManage = !showManage')
    .cart-content
      van-checkbox-group.card-goods(v-model='checkedGoods' ref='checkboxGroup')
        van-checkbox.card-goods__item(v-for='item in goods', :key='item.id', :name='item.id')
          van-card(:title='item.title', :desc='item.desc', :num='item.num', :price='formatPrice(item.price)', :thumb='item.thumb')
      van-submit-bar(v-if='!showManage' :price='totalPrice', :disabled='!checkedGoods.length', :button-text='submitBarText', @submit='onSubmit' class='animated lightSpeedIn')
        van-checkbox(v-model='checked' @click='selectGoods') 全选
      .manage-panal(v-if='showManage' class='animated fadeInUp')
        van-checkbox(v-model='checked' @click='selectGoods') 全选
        van-button(type='danger' size='mini' round @click='manageGoods' :disabled='!checkedGoods.length') 删除
    .cart-btmnar
      Tabbar(:tabNum='tabNum')
</template>

<script>
import { Toast } from 'vant'
import Tabbar from '_c/Tabbar/index'
export default {
  name: 'Cart',
  components: {
    Tabbar
  },
  data() {
    return {
      tabNum: 3,
      showManage: false,
      checkedGoods: ['1', '2', '3'],
      goods: [{
        id: '1',
        title: '进口香蕉',
        desc: '约250g，2根',
        price: 200,
        num: 1,
        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/2f9a36046449dafb8608e99990b3c205.jpeg'
      }, {
        id: '2',
        title: '陕西蜜梨',
        desc: '约600g',
        price: 690,
        num: 1,
        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/f6aabd6ac5521195e01e8e89ee9fc63f.jpeg'
      }, {
        id: '3',
        title: '美国伽力果',
        desc: '约680g/3个',
        price: 2680,
        num: 1,
        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
      }, {
        id: '4',
        title: '美国伽力果',
        desc: '约680g/3个',
        price: 2680,
        num: 1,
        thumb: 'https://img.yzcdn.cn/public_files/2017/10/24/320454216bbe9e25c7651e1fa51b31fd.jpeg'
      }]
    }
  },
  computed: {
    submitBarText() {
      const count = this.checkedGoods.length
      return '结算' + (count ? `(${count})` : '')
    },
    totalPrice() {
      return this.goods.reduce((total, item) => total + (this.checkedGoods.indexOf(item.id) !== -1 ? item.price : 0), 0)
    },
    checked() {
      return this.goods.length === this.checkedGoods.length
    },
    titleRight() {
      return this.showManage ? '完成' : '管理'
    }
  },
  methods: {
    formatPrice(price) {
      return (price / 100).toFixed(2)
    },
    onSubmit() {
      Toast('点击结算')
    },
    goback() {
      this.$router.go(-1)
    },
    selectGoods() {
      if (this.checked) {
        this.$refs.checkboxGroup.toggleAll(false)
      } else {
        this.$refs.checkboxGroup.toggleAll(true)
      }
    },
    manageGoods() {
      Toast('删除购物车商品')
    }
  }
}
</script>

<style lang="less">
#cart-container {
  .cart-content {
    margin-bottom: 80px;
    .van-checkbox {
      padding: 0 10px;
    }
    .manage-panal {
      height: 50px;
      width: 90%;
      position: fixed;
      bottom: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
    }
  }
  .card-goods {
  padding: 10px 0;
  background-color: #fff;
  &__item {
    position: relative;
    background-color: #fafafa;
    .van-checkbox__label {
      width: 100%;
      height: auto; // temp
      padding: 0 10px 0 15px;
      box-sizing: border-box;
    }
    .van-checkbox__icon {
      top: 50%;
      left: 10px;
      z-index: 1;
      position: absolute;
      margin-top: -10px;
    }
    .van-card__price {
      color: #f44;
    }
  }
  }
  .van-submit-bar {
    bottom: 50px;
  }
}
</style>
