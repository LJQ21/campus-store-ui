<template lang="pug">
  div#login-container
    mt-button(type="primary" @click="showTip") 登录
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "Login",
  data() {
    return {};
  },
  methods: {
    showTip() {
      Toast({
        message: "提示",
        position: "bottom",
        duration: 5000
      });
    }
  }
};
</script>
