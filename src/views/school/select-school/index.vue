<template lang='pug'>
  #select-school-container
    .select-school-header
      van-nav-bar(title='学校' left-text='返回' left-arrow @click-left='$router.go(-1)')
      van-search(placeholder='请输入搜索关键词' v-model='schoolName' show-action label='学校' shape='round')
        div(slot='action') 搜索
    .select-school-content
      van-list(v-model='loading' :finished='finished' finished-text='没有更多了' @load='onLoad')
        van-cell(v-for='item in list' :key='item' :title='item' @click='$toast(item)')
</template>

<script>
export default {
  name: 'SelectSchool',
  data() {
    return {
      schoolName: '',
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
#select-school-container {
  .select-school-content {
    .van-cell {
      text-align: center;
    }
  }
}
</style>
