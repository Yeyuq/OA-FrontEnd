<template>
  <el-container class="main_container">
      <el-aside class="aside_box" style="width: 200px">
        <el-row class="elrow1">
          <el-avatar class="icon" icon="el-icon-user-solid" :size="50" style="background-color: #409EFF" @click.native="user_setting"></el-avatar>
        </el-row>
        <el-row class="aside_row">
          <el-col :span="24">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose" style="text-align: left">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-suitcase-1"></i>
                  <span>行政办公</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1">我的任务</el-menu-item>
                  <el-menu-item index="1-2">新建任务</el-menu-item>
                  <el-menu-item index="1-3">设定任务时间</el-menu-item>
                  <el-menu-item index="1-4" disabled>分配任务</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-date"></i>
                  <span>审批申请</span>
                </template>
                  <el-menu-item-group>
                    <el-menu-item index="2-1" disabled>查看员工状态</el-menu-item>
                    <el-menu-item index="2-2" disabled>员工申请审批</el-menu-item>
                    <el-menu-item index="2-3">我的出勤</el-menu-item>
                    <el-menu-item index="2-4">我的申请</el-menu-item>
                  </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-notebook-1"></i>
                  <span>日志系统</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1">填写日志</el-menu-item>
                  <el-menu-item index="3-2">我的日志</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-data-analysis"></i>
                  <span>会议管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1">会议室查看</el-menu-item>
                  <el-menu-item index="4-2">会议通知</el-menu-item>
                  <el-menu-item index="4-3">通知开会</el-menu-item>
                  <el-menu-item index="4-4">管理会议室状态</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-s-platform"></i>
                  <span>系统管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1">管理公司信息发布平台</el-menu-item>
                  <el-menu-item index="5-2">日志查询</el-menu-item>
                  <el-menu-item index="5-3">查看全部员工出勤</el-menu-item>
                  <el-menu-item index="5-4">系统权限管理</el-menu-item>
                </el-menu-item-group >
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header style="height: 40px">
        <!--<el-header  style="text-align: left;height: 40px"@click.native="gotoMain()" ><i class="el-icon-s-data"></i>MainWorkspace-->
        <!--<el-header style="text-align: left;height: 40px">-->
          <!--<breadCrumb>-->
          <!--</breadCrumb>-->
        </el-header>
        <el-main>
          <!--&lt;!&ndash;路由视图&ndash;&gt;-->
          <router-view></router-view>
        </el-main>
        <!--<el-footer>Footer</el-footer>-->
      </el-container>
  </el-container>
</template>

<script>
// import breadCrumb from './breadCrumb'
export default {
  name: 'UserMain',
  // components:{
  //   breadCrumb
  // },
  data(){
    return{
      color:'',
      align:'',
      height:'',
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    user_setting() {
      this.$router.push("/UserSetting");
      console.log("123");
    }
  }
}
</script>

<style lang="less" scoped>
  .main_container{
    width: 100%;
    height: 100%;
    .aside_box{
      z-index:1;
      background-color: rgba(255,255,255,0.5);
      box-shadow: 0 2px 17px 0 rgba(64, 158, 255, 0.2);
      width: 200px;
    }
  }

  .el-aside {
    background-color: white;
    color: black;
    text-align: center;
    line-height: 200px;
    /*background-color: rgba(255,255,255,0.5);*/
    /*box-shadow: 0 2px 17px 0 rgba(0, 0, 0, 0.2);*/
  }

  .el-header, .el-footer {
    background-color: white;
    color: black;
    text-align: center;
    line-height: 40px;
    /*height: 20px;*/
    /*background-color: rgba(255,255,255,0.5);*/
    /*box-shadow: 2px 2px 12px 2px rgba(0, 0, 0, 0.2);*/
  }

  .el-main {
    background-color: #F6F7F9;
    color: black;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .elrow1{
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon{
      border: 2px solid rgba(255,255,255,0.7);
      /*box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.2);*/
    }
  }

  .aside_row{
    /*bottom: 100px;*/
    width: 200px;
    margin-top:20px;
  }

  .main_avatar{
    //z-index: 1;
    /*position: absolute;*/
    /*margin-left: 55px;*/
    /*margin-top: 10px;*/
    width: 50px;
    height: 50px;
  }

</style>
