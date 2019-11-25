<template lang='pug'>
  #form-container
    .form-header
      van-nav-bar(title='发布商品' right-text='我的发布' @click-right='onChickRight')
    .form-content
      van-cell-group
        van-field(v-model='goodsName' label='商品名称' placeholder='请输入商品名称')
        van-field(readonly clickable label='商品类别' :value='goodsType' placeholder='选择商品分类' @click='showPicker = true')
        van-popup(v-model='showPicker' position='bottom')
          van-picker(show-toolbar :columns='columns' @cancel='showPicker = false' @confirm='onConfirm')
        van-field(v-model='goodsPrice' label='商品价格' placeholder='请输入商品价格' right-icon='after-sale')
        h2.title 图片上传
        van-uploader(v-model='fileList' multiple :max-count='2' :before-read='asyncBeforeRead')
        van-cell-group
          van-field(v-model='message', rows='2', autosize='', label='商品描述', type='textarea', maxlength='50', placeholder='请输入商品描述', show-word-limit='')
    .form-btn-container
        van-button(type='primary') 发布
    .form-btmnav
      Tabbar(:tabNum='tabNum')
</template>

<script>
import Tabbar from '_c/Tabbar/index'
import { Toast } from 'vant'
export default {
  name: 'Form',
  components: {
    Tabbar
  },
  data() {
    return {
      tabNum: 2,
      goodsName: '',
      goodsPrice: '',
      goodsType: '',
      showPicker: false,
      columns: ['英语四级', '计算机二级', '软件设计师', '会计二级', '英语六级'],
      fileList: [],
      message: ''
    }
  },
  methods: {
    onConfirm(value) {
      this.goodsType = value
      this.showPicker = false
    },
    asyncBeforeRead(file) {
      // 异步校验 返回Promise
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片')
          // 注意
          reject(new Error('文件格式不符合'))
        } else {
          resolve()
        }
      })
    },
    onChickRight() {
      Toast('我的发布历史')
    }
  }
}
</script>

<style lang="less" scoped>
#form-container {
  margin: 0 auto;
  .form-content {
    padding: 10px;
    .title {
      margin: 0;
      padding: 32px 16px 16px;
      color:rgba(69, 90, 100, 0.6);
      font-weight: normal;
      font-size: 14px;
    }
  }
  .form-btn-container {
    text-align: center;
  }
}
</style>
