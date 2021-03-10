<template>
  <div class="user_container">
    <el-container >
      <el-header class="bg_box">
        <div class="user_bg">
          <img class="user_bgimg" src="../img/userbg_22.jpg">
        </div>
        <div class="userAvatar_box">
          <el-avatar class="icon" icon="el-icon-user-solid" :size="199" style="background-color: #409EFF"></el-avatar>
        </div>
      </el-header>
      <el-main>
        <div class="user_name">
          <p style="font-family: '微软雅黑';font-weight: bold;font-size: 19px">
            菜虚鲲 Xu.KunCai
          </p>
        </div>
        <div class="user_introduce">
          <p style="font-family: '微软雅黑';font-weight: normal;font-size: 14px;line-height: 27px;text-align: left">
            <i class="el-icon-s-flag"></i>部门：摸鱼软件测试部 Moyu R&D<br/><i class="el-icon-s-cooperation"></i>岗位：软件测试工程师&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="el-icon-location"></i>地点：中国
          </p>
        </div>
        <div class="modify_box">
          <div class="modify_form">
            <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
              <el-form-item label="名称">
                <el-input v-model="formLabelAlign.name"></el-input>
              </el-form-item>
              <el-form-item label="活动区域">
                <el-input v-model="formLabelAlign.region"></el-input>
              </el-form-item>
              <el-form-item label="活动形式">
                <el-input v-model="formLabelAlign.type"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-main>

    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data(){
    return {
      labelPosition: 'right',
      formLabelAlign: {
        name: '',
        region: '',
        type: ''
      }
    };
  }
}
</script>

<style lang="less" scoped>
  .user_container{
    width: 100%;
    height: 100%;
    position: fixed;
  }
  .bg_box{
    position: absolute;
    width: 100%;
    height: 100%;
    /*left: 13%;*/
    right: 1.2%;
    /*padding-right: 1%;*/
    /*right: 20%;*/

    .userAvatar_box{
      position: absolute;
      /*top:90%;*/
      /*right: 79%;*/
      z-index: 1;
      margin-top: 112px ;
      margin-left: 20px;
      .icon {
        width: 100%;
        height: 100%;
        border: 7px solid rgba(255, 255, 255, 0.9);
        border-radius: 50%;
        /*padding:15px;*/
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
        /*margin: -65px auto;*/
        /*background-color: rgba(148,193,235,0.2);*/
        background-color: rgba(255, 255, 255, 0.2);
        /*line-height: 60px;*/
      }
    }
  }

  .user_bg{
    position: absolute;
    /*width: 100%;*/
    /*height: 100%;*/
    /*z-index: 0;*/
    /*padding-bottom: 20px;*/
    width: 1297px;
    height: 200px;
    /*bottom: 20%;*/
    .user_bgimg{
      width: 100%;
      height: 100%;
    }
  }

  .user_name{
    position: absolute;
    margin-left: 219px;
    margin-top: 109px;
  }

  .user_introduce{
    position: absolute;
    margin-left: 219px;
    margin-top: 229px;
  }

  .modify_box{
    width: 350px;
    height: 200px;
    background-color: white;
    position: absolute;
    top:55%;
  }



</style>
