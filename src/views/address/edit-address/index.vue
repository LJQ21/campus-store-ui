<template lang='pug'>
  #edit-address-container
    .edit-address-header
      van-nav-bar(title='地址编辑' left-text='返回' right-text='按钮' left-arrow @click-left='goBack')
    .edit-address-content
      h2.edit-address-content_title 请编辑您的地址
      van-cell-group
        van-field(v-model='addressForm.name' label='用户名' left-icon='contact' placeholder='请输入用户名')
        van-field(v-model='addressForm.phoneNumber' label='电话' left-icon='phone-circle-o' placeholder='请输入电话')
        van-field(readonly clickable label='地址' left-icon='wap-home-o' :value='addressForm.city' placeholder='选择地址' @click='showPicker = true')
        van-popup(v-model='showPicker' position='bottom')
          van-picker(show-toolbar :columns='columns' @cancel='showPicker = false' @confirm='onConfirm' @change='onChange')
        van-field(v-model='addressForm.addressDetail' label='详细地址' placeholder='请输入详细地址' type='textarea' maxlength='50' show-word-limit)
        van-cell(title='设置为默认收货地址')
          van-switch(slot='right-icon' v-model='setDefault')
      .edit-address-content_btns
        van-button.edit-address-content_btn(type='danger' @click='saveAddress') 保存
        van-button.edit-address-content_btn(type='default' @click='deleteAddress') 删除
</template>

<script>
let citys = {}
export default {
  name: 'EditAdress',
  data() {
    return {
      showPicker: false, // 显示地址选择器
      setDefault: false, // 设置为默认地址
      columns: [
        {
          values: Object.keys(citys),
          className: 'column1'
        },
        {
          values: citys['浙江'],
          className: 'column2',
          defaultIndex: 2
        }
      ],
      addressForm: {
        name: '',
        phoneNumber: '',
        city: '',
        addressDetail: ''
      }
    }
  },
  // created() {
  //   this.getCitys()
  // },
  // watch: {
  //   // 如果路由有变化，会再次执行该方法
  //   '$route': 'getCitys'
  // },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.getCitys()
    })
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    onChange(picker, values) {
      picker.setColumnValues(1, citys[values[0]])
    },
    onConfirm(value) {
      this.addressForm.city = value.join('')
      this.showPicker = false
    },
    getCitys() {
      citys = {
        '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        '福建': ['福州', '厦门', '莆田', '三明', '泉州']
      }
    },
    saveAddress() {
      // 调用保存订单api
    },
    deleteAddress() {
      // 调用删除订单api
    }
  }
}
</script>

<style lang="less" scoped>
#edit-address-container {
  background: #f8f8f8;
  .edit-address-content {
    margin-top: 20px;
    &_title {
      margin: 0;
      padding: 32px 16px 16px;
      padding-top: 32px;
      color: rgba(69, 90, 100, 0.6);
      font-weight: normal;
      font-size: 14px;
    }
    &_btns {
      padding: 32px 16px;
    }
    &_btn {
      display: block;
      width: 100%;
      margin-bottom: 8px;
    }
  }
}
</style>
