<template>
  <div class="user_container">
    <el-container >
      <!--<div style="position: absolute;bottom: 94.7%;left:77%;z-index: 1;color: #909399">-->
        <!--<i class="el-icon-edit-outline"></i>用户信息修改-->
      <!--</div>-->
      <div style="position: absolute;z-index: 1;color: #909399;bottom: 103.7%">
        <el-page-header style="font-family: 微软雅黑" title="首页" @back="goBack" content="用户信息修改">
        </el-page-header>
      </div>
      <el-header class="bg_box">
        <div class="user_bg">
          <img class="user_bgimg" src="../img/img222.jpg">
        </div>
        <div class="userAvatar_box">
          <el-avatar class="icon" icon="el-icon-user-solid" :size="129" style="background-color: #409EFF"></el-avatar>
        </div>
      </el-header>
      <el-main>
        <div class="user_name">
          <p style="font-family: '微软雅黑';font-weight: normal;font-size: 19px;text-shadow: 2px 2px 3px rgba(64, 158, 255, 0.2) ">
            菜虚鲲 Xu.KunCai
          </p>
        </div>
        <div class="user_introduce">
          <p style="font-family: '微软雅黑';font-weight: normal;font-size: 14px;line-height: 27px;text-align: left;color: #909399">
            <i class="el-icon-s-flag"></i>部门：摸鱼软件测试部 Moyu R&D<br/>
            <!--&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;-->
            <i class="el-icon-s-cooperation"></i>岗位：软件测试工程师&emsp;&emsp;&emsp;<i class="el-icon-s-comment"></i>邮箱：222222222@qq.com
            &emsp;&emsp;
            <i class="el-icon-location"></i>地点：中国
          </p>
          <!--<hr style="border:none;border-top:2px dashed #3A75B2;margin: 0 auto" />-->
          <div style="border-top: 2px solid #3A75B2;margin-top: 10px;position: relative;bottom: 10px;right: 213px;width: 900px"></div>
        </div>
        <div class="modify_box">
          <div class="modify_form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="活动区域" prop="region">
                <el-select style="display: flex;justify-content: left" v-model="ruleForm.region" placeholder="请选择活动区域">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="活动时间" required>
                <el-col :span="11">
                  <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="date2">
                    <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="活动名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item style="padding-right: 99px">
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
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
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goBack() {
      this.$router.push("/workspace");
    }
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
    right: 2.2%;
    bottom:92.9%;
    /*left: 1%;*/
    /*padding-right: 1%;*/
    /*right: 20%;*/

    .userAvatar_box{
      position: absolute;
      /*top:90%;*/
      /*right: 79%;*/
      z-index: 1;
      margin-top: 43px ;
      margin-left: 227px;
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
    width: 1220px;
    height: 752px;
    /*bottom: 20%;*/
    .user_bgimg{
      width: 100%;
      height: 100%;
      border-radius: 7px;
    }
  }

  .user_name{
    position: absolute;
    margin-left: 351px;
    /*margin-bottom: 100px;*/
    /*margin: 0 auto;*/
    z-index: 1;
  }

  .user_introduce{
    position: absolute;
    margin-left: 351px;
    margin-top: 100px;
    z-index: 1;
  }

  .modify_box{
    width: 929px;
    height: 520px;
    background-color: rgba(255,255,255,0.9);
    position: absolute;
    top:13%;
    left: 9.9%;
    box-shadow: 2px 2px 3px rgba(64, 158, 255, 0.29),-2px 2px 3px rgba(64, 158, 255, 0.29);
    /*box-shadow: 0 2px 2px 0 rgba(64, 158, 255, 0.7);*/
    border-radius: 7px;
  }

  .modify_form{
    position: absolute;
    top: 22%;
    /*position: center;*/
    margin-left: 166px;
    /*margin-top: 10px;*/
  }



</style>
