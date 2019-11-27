<template lang="pug">
  #login-container
    .jq22-container
      .login-wrap
        .login-html
          input#tab-1.sign-in(type='radio', name='tab', checked='')
          label.tab(for='tab-1') 登录
          input#tab-2.sign-up(type='radio', name='tab')
          label.tab(for='tab-2')
          .login-form
            .sign-in-htm
              .group
                label.label(for='user') 用户名
                input#user.input(type='text' v-model.trim='$v.accountForm.account.$model' @blur='$v.accountForm.account.$touch')
                .error-tip(v-if='$v.accountForm.account.$dirty && !$v.accountForm.account.required' class='animated shake') 用户名不能为空
              .group
                label.label(for='pass') 密码
                input#pass.input(type='password', data-type='password' v-model.trim='$v.accountForm.password.$model' @blur='$v.accountForm.password.$touch')
                .error-tip(v-if='$v.accountForm.password.$dirty && !$v.accountForm.password.required' class='animated shake') 不能为空
              .group
                input#check.check(type='checkbox', checked='')
                label(for='check')
                  span.icon
                  |  Keep me Signed in
              .group
                input.button(type='submit', value='登录' @click='handleLoginByU')
              .hr
              .foot-lnk
                label(for='tab-2') 短信登录
              br
              .foot-lnk
                a(href='#forgot') 忘记密码?
              br
              .foot-lnk
                router-link(to='/register') 我要注册?
            .sign-in-phone
              .group
                label.label(for='user') 手机号
                input#user.input(type='text' v-model.trim='$v.phoneForm.phone.$model' @blur='$v.phoneForm.phone.$touch')
                .error-tip(v-if='$v.phoneForm.phone.$dirty && !$v.phoneForm.phone.required' class='animated shake') 手机号不能为空
                .error-tip(v-else-if='$v.phoneForm.phone.$dirty && !$v.phoneForm.phone.phone' class='animated shake') 手机号码有误
                .error-tip(v-else-if='$v.phoneForm.valiNum.$dirty && !$v.phoneForm.valiNum.required' class='animated shake') 验证码不能为空
                .error-tip(v-else-if='$v.phoneForm.valiNum.$dirty && !$v.phoneForm.valiNum.numeric' class='animated shake') 验证码不合法
              label.label(for='ver-code' style='font-size: 12px; color: #aaa;') 验证码
              van-row.verification
                van-col(span='12')
                  van-button(type='primary' round @click='sendNum') 发送验证码
                van-col(span='1')
                  van-count-down.count-down(:time='time' format='ss' :auto-start='false' ref='countDown')
                van-col(span='11')
                  input.verification_code(type='text' v-model.trim='$v.phoneForm.valiNum.$model' @blur='$v.phoneForm.valiNum.$touch')
              .group
                input.button(type='submit', value='登录' @click='handleLoginByP')
              .hr
              .foot-lnk
                label(for='tab-1') 密码登录
</template>

<script>
import { required, numeric, helpers } from 'vuelidate/lib/validators'
const phone = helpers.regex('phone', /^1[3456789]\d{9}$/)
export default {
  name: 'Login',
  data() {
    return {
      time: 2 * 60 * 1000,
      accountForm: {
        account: '',
        password: ''
      },
      phoneForm: {
        phone: '',
        valiNum: ''
      },
      redirect: undefined,
      otherQuery: {}
    }
  },
  validations: {
    accountForm: {
      account: {
        required
      },
      password: {
        required
      }
    },
    phoneForm: {
      phone: {
        required,
        phone
      },
      valiNum: {
        required,
        numeric
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  methods: {
    sendNum() {
      this.$v.phoneForm.phone.$touch()
      if (this.$v.phoneForm.phone.$invalid) {
        this.$toast('请输入手机号！')
      } else {
        this.$refs.countDown.start()
        this.$toast('验证码发送成功！')
      }
    },
    handleLoginByU() {
      console.log('submit login by user')
      this.$v.accountForm.$touch()
      if (this.$v.accountForm.$invalid) {
        this.$toast('账号或密码错误！')
        this.$v.accountForm.$reset()
        setTimeout(() => {
          this.$v.accountForm.$touch()
        }, 10)
      } else {
        // 调用登录验证api
        console.log('登录成功！')
        this.$store.dispatch('user/loginByAccount', this.accountForm)
          .then(() => {
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    handleLoginByP() {
      console.log('submit login by phone')
      this.$v.phoneForm.$touch()
      if (this.$v.phoneForm.$invalid) {
        this.$toast('请输入合法信息！')
        this.$v.phoneForm.$reset()
        setTimeout(() => {
          this.$v.phoneForm.$touch()
        }, 10)
      } else {
        // 调用注册api
        this.$toast('登录成功！')
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>

<style lang="less" scoped>
#login-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  height: auto;

  margin: 0;
  color: #6a6f8c;
  //background: #c8c8c8;
  background: rgba(40, 57, 101, 0.9);
  font: 600 16px/18px "Open Sans", sans-serif;
  background: url(../../assets/images/bg.jpg);
}
*,
:after,
:before {
  box-sizing: border-box;
}
.error-tip {
  font-size: 0.75rem;
  color: #f57f6c;
  line-height: 1;
  display: block;
  margin-left: 14px;
  margin-bottom: -0.75rem;
}
.clearfix:after,
.clearfix:before {
  content: "";
  display: table;
}
.clearfix:after {
  clear: both;
  display: block;
}
a {
  color: inherit;
  text-decoration: none;
}
input,
button {
  outline: none;
  border: none;
}
.login-wrap {
  width: 100%;
  margin: auto;
  max-width: 525px;
  min-height: 670px;
  position: relative;
  //background: url(../../assets/images/bg.jpg) no-repeat center;
  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
.login-html {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 90px 70px 50px 70px;
  background: rgba(40, 57, 101, 0.9);
}
.login-html .sign-in-htm,
.login-html .sign-in-phone {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  -webkit-transform: rotateY(180deg);
  transform: rotateY(180deg);
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  -webkit-transition: all 0.4s linear;
  transition: all 0.4s linear;
}
.login-html .sign-in,
.login-html .sign-up,
.login-form .group .check {
  display: none;
}
.login-html .tab,
.login-form .group .label,
.login-form .group .button {
  text-transform: uppercase;
}
.login-html .tab {
  font-size: 22px;
  margin-right: 15px;
  padding-bottom: 5px;
  margin: 0 15px 10px 0;
  display: inline-block;
  border-bottom: 2px solid transparent;
}
.login-html .sign-in:checked + .tab,
.login-html .sign-up:checked + .tab {
  color: #fff;
  border-color: #1161ee;
}
.login-form {
  min-height: 345px;
  position: relative;
  -webkit-perspective: 1000px;
  perspective: 1000px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
}
.login-form .group {
  margin-bottom: 15px;
}
.login-form .group .label,
.login-form .group .input,
.login-form .group .button {
  width: 100%;
  color: #fff;
  display: block;
}
.login-form .group .input,
.login-form .group .button {
  border: none;
  padding: 15px 20px;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
}
.login-form .group input[data-type="password"] {
  text-security: circle;
  -webkit-text-security: circle;
}
.login-form .group .label {
  color: #aaa;
  font-size: 12px;
}
.login-form .group .button {
  background: #1161ee;
}
.login-form .group label .icon {
  width: 15px;
  height: 15px;
  border-radius: 2px;
  position: relative;
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
}
.login-form .group label .icon:before,
.login-form .group label .icon:after {
  content: "";
  width: 10px;
  height: 2px;
  background: #fff;
  position: absolute;
  -webkit-transition: all 0.2s ease-in-out 0s;
  transition: all 0.2s ease-in-out 0s;
}
.login-form .group label .icon:before {
  left: 3px;
  width: 5px;
  bottom: 6px;
  -webkit-transform: scale(0) rotate(0);
  -ms-transform: scale(0) rotate(0);
  transform: scale(0) rotate(0);
}
.login-form .group label .icon:after {
  top: 6px;
  right: 0;
  -webkit-transform: scale(0) rotate(0);
  -ms-transform: scale(0) rotate(0);
  transform: scale(0) rotate(0);
}
.login-form .group .check:checked + label {
  color: #fff;
}
.login-form .group .check:checked + label .icon {
  background: #1161ee;
}
.login-form .group .check:checked + label .icon:before {
  -webkit-transform: scale(1) rotate(45deg);
  -ms-transform: scale(1) rotate(45deg);
  transform: scale(1) rotate(45deg);
}
.login-form .group .check:checked + label .icon:after {
  -webkit-transform: scale(1) rotate(-45deg);
  -ms-transform: scale(1) rotate(-45deg);
  transform: scale(1) rotate(-45deg);
}
.login-html
  .sign-in:checked
  + .tab
  + .sign-up
  + .tab
  + .login-form
  .sign-in-htm {
  -webkit-transform: rotate(0);
  -ms-transform: rotate(0);
  transform: rotate(0);
}
.login-html .sign-up:checked + .tab + .login-form .sign-in-phone {
  -webkit-transform: rotate(0);
  -ms-transform: rotate(0);
  transform: rotate(0);
}
.hr {
  height: 2px;
  margin: 60px 0 50px 0;
  background: rgba(255, 255, 255, 0.2);
}
.foot-lnk {
  text-align: center;
}
.verification {
  margin: 10px 0 10px 0;
  &_code {
    width: 100%;
    border: none;
    padding: 15px 20px;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.1);
  }
}
.count-down {
  font-size: 12px;
  text-align:center;
  line-height: 25px;
  color: #aaa;
  display: inline-block;
  width: 25px;
  height: 25px;
  border: none;
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
}
</style>
