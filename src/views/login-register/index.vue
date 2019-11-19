<template lang="pug">
  #login-container
    .jq22-container
      .login-wrap
        .login-html
          input#tab-1.sign-in(type='radio', name='tab', checked='')
          label.tab(for='tab-1') Sign In
          input#tab-2.sign-up(type='radio', name='tab')
          label.tab(for='tab-2') Sign Up
          .login-form
            .sign-in-htm
              .group
                label.label(for='user') Username
                input#user.input(type='text' v-model.trim='$v.loginForm.username.$model' @blur='$v.loginForm.username.$touch')
                .error-tip(v-if='$v.loginForm.username.$dirty && !$v.loginForm.username.required' class='animated shake') 用户名不能为空
              .group
                label.label(for='pass') Password
                input#pass.input(type='password', data-type='password' v-model.trim='$v.loginForm.password.$model' @blur='$v.loginForm.password.$touch')
                .error-tip(v-if='$v.loginForm.password.$dirty && !$v.loginForm.password.required' class='animated shake') 不能为空
              .group
                input#check.check(type='checkbox', checked='')
                label(for='check')
                  span.icon
                  |  Keep me Signed in
              .group
                input.button(type='submit', value='Sign In' @click='handleLoginIn')
              .hr
              .foot-lnk
                a(href='#forgot') Forgot Password?
            .sign-up-htm
              .group
                label.label(for='user') Username
                input#user.input(type='text' v-model.trim='$v.registerForm.username.$model' @blur='$v.registerForm.username.$touch')
                .error-tip(v-if='$v.registerForm.username.$dirty && !$v.registerForm.username.required' class='animated shake') 不能为空
                .error-tip(v-else-if='$v.registerForm.username.$dirty && !$v.registerForm.username.alphaNum' class='animated shake') 用户名名由字母或数字构成
                .error-tip(v-else-if='$v.registerForm.username.$dirty && !$v.registerForm.username.minLength' class='animated shake') 密码长度不得少于6位
                .error-tip(v-else-if='$v.registerForm.username.$dirty && !$v.registerForm.username.maxLength' class='animated shake') 密码长度不得超过18位
              .group
                label.label(for='pass') Password
                input#pass.input(type='password', data-type='password' v-model.trim='$v.registerForm.password.$model' @blur='$v.registerForm.password.$touch')
                .error-tip(v-if='$v.registerForm.password.$dirty && !$v.registerForm.password.required' class='animated shake') 密码为空
                .error-tip(v-else-if='$v.registerForm.password.$dirty && !$v.registerForm.password.alphaNum' class='animated shake') 用户名名由字母或数字构成
                .error-tip(v-else-if='$v.registerForm.password.$dirty && !$v.registerForm.password.minLength' class='animated shake') 密码长度不得少于4位
                .error-tip(v-else-if='$v.registerForm.password.$dirty && !$v.registerForm.password.maxLength' class='animated shake') 密码长度不得超过18位
              .group
                label.label(for='pass') Repeat Password
                input#pass.input(type='password', data-type='password' v-model.trim='$v.registerForm.repeat_password.$model')
                .error-tip(v-if='$v.registerForm.repeat_password.$dirty && !$v.registerForm.repeat_password.sameAsPassword' class='animated shake') 密码不一致
              .group
                label.label(for='pass') Email Address
                input#pass.input(type='text' v-model='$v.registerForm.email.$model' @blur='$v.registerForm.email.$touch')
                .error-tip(v-if='$v.registerForm.email.$dirty && !$v.registerForm.email.required' class='animated shake') 邮箱不能为空
                .error-tip(v-else-if='$v.registerForm.email.$dirty && !$v.registerForm.email.email' class='animated shake') 邮箱格式不合法
              .group
                input.button(type='submit', value='Sign Up' @click='handleLoginUp')
              .hr
              .foot-lnk
                label(for='tab-1') Already Member?
</template>

<script>
import { Notify } from 'vant'
import { required, sameAs, email, minLength, maxLength, alphaNum } from 'vuelidate/lib/validators'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        username: '',
        password: '',
        repeat_password: '',
        email: ''
      }
    }
  },
  validations: {
    loginForm: {
      username: {
        required
      },
      password: {
        required
      }
    },
    registerForm: {
      username: {
        required,
        alphaNum,
        minLength: minLength(6),
        maxLength: maxLength(18)
      },
      password: {
        required,
        alphaNum,
        minLength: minLength(6),
        maxLength: maxLength(18)
      },
      repeat_password: {
        sameAsPassword: sameAs('password')
      },
      email: {
        required,
        email
      }
    }
  },
  methods: {
    showNotify(type, message) {
      Notify({ type: type, message: message })
    },
    handleLoginIn() {
      console.log('submit login in')
      this.$v.loginForm.$touch()
      if (this.$v.loginForm.$invalid) {
        this.showNotify('warning', '账号或密码错误！')
        this.$v.loginForm.$reset()
        setTimeout(() => {
          this.$v.loginForm.$touch()
        }, 10)
      } else {
        // 调用登录验证api
        this.showNotify('success', '登录成功！')
      }
    },
    handleLoginUp() {
      console.log('submit login up')
      this.$v.registerForm.$touch()
      if (this.$v.registerForm.$invalid) {
        this.showNotify('warning', '请输入合法信息！')
        this.$v.registerForm.$reset()
        setTimeout(() => {
          this.$v.registerForm.$touch()
        }, 10)
      } else {
        // 调用注册api
        this.showNotify('success', '注册成功！')
      }
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
.login-html .sign-up-htm {
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
.login-html .sign-up:checked + .tab + .login-form .sign-up-htm {
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
</style>
