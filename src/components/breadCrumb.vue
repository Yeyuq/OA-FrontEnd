<template>
  <div class="breadCrumb_fix">
    <el-breadcrumb class="breadcrumb-container" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item v-for="item in levelList":key="item.path" :to="item.path" style="line-height: 40px">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'breadCrumb',
  data() {
    return {
      levelList: []
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created(){
    this.getBreadcrumb()
  },
  methods:{
    getBreadcrumb() {
      //$route.matched一个数组 包含当前路由的所有嵌套路径片段的路由记录
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0];
      if (first && first.name.trim().toLocaleLowerCase() !== 'UserMain'.toLocaleLowerCase()) {
        matched = [{ path: '/userMain', meta: { title: '首页' }}].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style scoped>

</style>
