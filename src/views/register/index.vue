<template lang='pug'>
  #register
    .register-form
      // 步骤条
      van-steps(:active='active', active-icon='success', active-color='#38f')
        van-step 手机验证
        van-step 用户信息
        van-step 完成
      // 手机验证
      .register-form_tab(v-if='active==0' class='animated fadeInRight')
        h2.register-form_tab_title 校园商城
        h3.register-form_tab_subtitle {{ setpPTip }}
        input.input(type='text' placeholder='请输入手机号' v-model.trim='$v.stepP.phone.$model' @blur='$v.stepP.phone.$touch')
        van-row
          van-col(span='12')
            van-button(type='primary' round @click='seedNum' :disabled='disabled') 发送验证码
          van-col(span='1')
            van-count-down.count-down(:time='time' format='ss' :auto-start='false' ref='countDown' @finish='finished')
          van-col(span='11')
            input.input(type='text' placeholder='验证码' v-model.trim='$v.stepP.valiNum.$model' @blur='$v.stepP.valiNum.$touch')
        van-button(type='primary' @click='clickNext') Next
      // 用户密码
      .register-form_tab(v-if='active==1' class='animated fadeInRight')
        h2.register-form_tab_title 校园商城
        h3.register-form_tab_subtitle {{ stepUTip }}
        van-cell-group
          van-field.input(type='text' placeholder='请输入用户名' v-model.trim='$v.stepU.account.$model' @blur='verifyAccount')
            van-icon(v-if='accountVerify !== undefined' slot='right-icon' :name="accountVerify ? 'checked' : 'warning'" :color="accountVerify ? 'green' : 'red'")
          van-field.input(:type="checkShow ? 'text' : 'password'" placeholder='请输入密码' v-model.trim='$v.stepU.password.$model' @blur='$v.stepU.password.$touch' :right-icon="checkShow ? 'eye-o' :'closed-eye'" @click-right-icon='checkShow = !checkShow')
          van-field.input(type='text' placeholder='请输入邮箱' v-model.trim='$v.stepU.email.$model' @blur='emailAccount')
            van-icon(v-if='emailVerify !== undefined' slot='right-icon' :name="emailVerify ? 'checked' : 'warning'" :color="emailVerify ? 'green' : 'red'")
        van-button(type='primary' @click='toRegister') 注册
      .register-form_tab(v-if='active==2' class='animated fadeInRight')
        h2.register-form_tab_title 恭喜你，注册成功
        router-link.register-form_tab_subtitle(to='/login') 登录
</template>

<script>
import { send, verify, register, verifyAccount, verifyEmail } from '@/api/user'
import { Toast } from 'vant'
import { required, helpers, alphaNum, minLength, maxLength, email } from 'vuelidate/lib/validators'
const phone = helpers.regex('phone', /^1[3456789]\d{9}$/)
export default {
  name: 'Register',
  data() {
    return {
      active: 0,
      time: 2 * 60 * 1000, // 倒计时
      checkShow: false,
      disabled: false,
      accountVerify: undefined,
      emailVerify: undefined,
      stepU: {
        // 用户密码
        account: '',
        password: '',
        email: ''
      },
      stepP: {
        // 手机验证
        phone: '',
        valiNum: ''
      }
    }
  },
  validations: {
    // 验证方式
    stepU: {
      account: {
        required,
        alphaNum,
        minLength: minLength(4),
        maxLength: maxLength(18)
      },
      password: {
        required,
        alphaNum,
        minLength: minLength(6),
        maxLength: maxLength(18)
      },
      email: {
        email
      }
    },
    stepP: {
      phone: {
        required,
        phone
      },
      valiNum: {
        required,
        alphaNum
      }
    }
  },
  methods: {
    verifyAccount() {
      console.log('account:' + this.stepU.account)
      if (this.stepU.account) {
        this.$v.stepU.account.$touch()
        // 验证用户名
        verifyAccount(this.stepU.account).then(() => {
          this.accountVerify = true
        }).catch(error => {
          this.accountVerify = false
          this.$toast(error.data.msg)
        })
      }
    },
    emailAccount() {
      console.log('account:' + this.stepU.email)
      if (this.stepU.email) {
        this.$v.stepU.email.$touch()
        // 验证用户名
        verifyEmail(this.stepU.email).then(() => {
          this.emailVerify = true
        }).catch(error => {
          this.emailVerify = false
          this.$toast(error.data.msg)
        })
      }
    },
    seedNum() {
      // 发送验证码
      this.$v.stepP.phone.$touch()
      if (!this.$v.stepP.phone.required || !this.$v.stepP.phone.phone) {
        Toast.fail('请输入合法的手机号')
      } else {
        // 重置倒计时
        this.$refs.countDown.reset()
        // 调用发送验证码Api
        send(this.stepP.phone).then(response => {
          this.$refs.countDown.start() // 开始倒计时
          Toast.success('验证码发送成功')
          this.disabled = true
        }).catch(error => {
          console.log(error)
          Toast(error.data.msg || '验证码发送失败,请重试')
        })
      }
    },
    clickNext() {
      // 手机验证
      this.$v.stepP.$touch()
      if (this.$v.stepP.$invalid) {
        Toast.fail('请输入正确的手机号和验证码！')
      } else {
        // 调用手机验证Api
        verify(this.stepP.valiNum).then(res => {
          // 验证通过，下一步
          Toast.success('验证通过！')
          this.active = this.active + 1
        }).catch(error => {
          console.log(error)
          Toast('手机验证码错误')
        })
      }
    },
    toRegister() {
      // 注册
      if (this.active === 1) {
        this.$v.stepU.$touch()
        if (this.$v.stepU.$invalid) {
          Toast.fail('请先完善基本信息')
        } else if (!this.accountVerify || !this.emailVerify) {
          Toast.fail('用户名或邮箱已注册')
        } else {
          // 调用注册api
          register({ account: this.stepU.account, password: this.stepU.password, email: this.stepU.email }).then(() => {
            this.active = this.active + 1
          }).catch(error => {
            console.log(error)
            Toast('注册失败:' + error.data.msg)
          })
        }
      }
    },
    finished() {
      this.disabled = false
    }
  },
  computed: {
    stepUTip() {
      // 注册用户密码验证提示信息
      if (this.$v.stepU.account.$dirty && !this.$v.stepU.account.required) {
        return '用户名不能为空'
      } else if (this.$v.stepU.account.$dirty && !this.$v.stepU.account.minLength) {
        return '用户名不得少于4位'
      } else if (this.$v.stepU.account.$dirty && !this.$v.stepU.account.alphaNum) {
        return '用户名只能位数字或字母构成'
      } else if (this.$v.stepU.account.$dirty && !this.$v.stepU.account.maxLength) {
        return '用户名不得超过18位'
      } else if (this.accountVerify !== undefined && !this.accountVerify) {
        return '用户名已存在'
      } else if (this.$v.stepU.password.$dirty && !this.$v.stepU.password.required) {
        return '密码不能为空'
      } else if (this.$v.stepU.password.$dirty && !this.$v.stepU.password.alphaNum) {
        return '密码只能由字母数字构成'
      } else if (this.$v.stepU.password.$dirty && !this.$v.stepU.password.minLength) {
        return '密码不能少于6位'
      } else if (this.$v.stepU.password.$dirty && !this.$v.stepU.password.maxLength) {
        return '密码不能超过18位'
      } else if (this.$v.stepU.email.$dirty && !this.$v.stepU.email.email) {
        return '邮箱格式不符合'
      } else if (this.emailVerify !== undefined && !this.emailVerify) {
        return '该邮箱已注册'
      } else {
        return '我们大学生自己的二手交易商城'
      }
    },
    setpPTip() {
      // 注册手机号验证提示
      if (this.$v.stepP.phone.$dirty && !this.$v.stepP.phone.required) {
        return '手机号不能为空'
      } else if (this.$v.stepP.phone.$dirty && !this.$v.stepP.phone.phone) {
        return '手机号不合法'
      } else if (this.$v.stepP.valiNum.$dirty && !this.$v.stepP.valiNum.required) {
        return '验证码不能为空'
      } else if (this.$v.stepP.valiNum.$dirty && !this.$v.stepP.valiNum.alphaNum) {
        return '验证码格式不符'
      } else {
        return '我们大学生自己的二手交易商城'
      }
    }
  }
}
</script>

<style lang="less" scoped>
#register {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;
  margin: 0;
  color:#6a6f8c;
  background: rgba(40, 57, 101, 0.9);
  font: 600 16px/18px "Open Sans", sans-serif;
  background: url('../../assets/images/bg.jpg');
  .register-form {
    opacity: 0.9;
    width: 93%;
    margin: 50px auto;
    text-align: center;
    position: relative;
    &_tab {
      background:white;
      border: 0 none;
      border-radius: 3px;
      box-shadow: 0 0 15px 1px
      rgba(0, 0, 0, 0.4);
      padding: 20px 30px;
      box-sizing: border-box;
      width: 80%;
      margin: 10% 10%;
      position: absolute;

      &_title {
        font-size: 15px;
        text-transform: uppercase;
        color:#2C3E50;
        margin-bottom: 10px;
      }

      &_subtitle {
        font-size: 13px;
        color:#666;
        margin-bottom: 20px;
      }
      .count-down {
        position: absolute;
        right: 34px;
      }
      .input {
        padding: 15px;
        border: 1px solid#ccc;
        border-radius: 3px;
        margin-bottom: 10px;
        width: 100%;
        box-sizing: border-box;
        font-family: montserrat;
        color:#2C3E50;
        font-size: 13px;
      }
    }
  }
}
</style>
