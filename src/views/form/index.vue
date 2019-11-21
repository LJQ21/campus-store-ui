<template lang='pug'>
  #form
    van-nav-bar(title='发布商品')
    van-cell-group
      van-field(v-model='goodsName' label='商品名称' placeholder='请输入用户名')
      van-field(readonly clickable label='商品类别' :value='goodsType' placeholder='选择分类' @click='showPicker = true')
      van-popup(v-model='showPicker' position='bottom')
        van-picker(show-toolbar :columns='columns' @cancel='showPicker = false' @confirm='onConfirm')
      van-field(v-model='goodsPrice' label='商品价格' placeholder='请输入商品价格')
      h2.title 图片上传
      van-uploader(v-model='fileList' multiple :max-count='2' :before-read='asyncBeforeRead')
      van-cell-group
        van-field(v-model='message', rows='2', autosize='', label='商品描述', type='textarea', maxlength='50', placeholder='请输入留言', show-word-limit='')
      van-button(type='primary') 保存
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
    }
  }
}
</script>

<style lang="less" scoped>
#form {
  text-align: center;
  margin: 0 auto;
  .title {
    margin: 0;
    padding: 32px 16px 16px;
    color:rgba(69, 90, 100, 0.6);
    font-weight: normal;
    font-size: 14px;
  }
}
</style>
