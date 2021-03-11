<template>
  <!--登录表单的容器-->
  <div class="login_container">
    <el-container class="all_box">
      <el-header class="login_header">
        <div>
          <!--<el-avatar class="header_icon" icon="el-icon-office-building" style="color:white;background-color: #162954"></el-avatar>-->
          <img class="header_icon" src="../assets/img/logo2.png">
          <span class="login_title" style="font-family: gayatri;color:#162954" >OA System</span>
        </div>
      </el-header>
      <el-main>
        <!--登录区域-->
        <div class="login_box">
          <!--头像-->
          <div class="avatar_box">
            <img src="../assets/img/头像2.png">
          </div>
          <!--表单-->
          <el-form :model="LoginForm" :rules="LoginRules" ref="LoginForm" class="Login_Form">
            <el-form-item  prop="username">
              <el-input v-model="LoginForm.username" prefix-icon="el-icon-user-solid" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item  prop="password">
              <el-input v-model="LoginForm.password" prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item  prop="verifyCode">
              <div class="verifyCode_box">
                <el-input style="width: 242px" v-model="LoginForm.verifyCode" prefix-icon="el-icon-key" placeholder="请输入验证码" class="verify_Code"></el-input>
                <img src="../assets/img/验证码.png" id="verify_code_img" class="verify_img" @click="change()" >
              </div>
            </el-form-item>
            <el-form-item class="Login_Btn">
              <el-button type="primary" style="width: 340%" @click="submitForm('LoginForm')">立即登录</el-button>
            </el-form-item>
            <!--<el-form-item class="Register_Btn">-->
            <!--<el-button @click="registerForm('LoginForm')">注册</el-button>-->
            <!--</el-form-item>-->
            <div class="link_group">
              <el-link type="info" @click="registerForm('LoginForm')">忘记密码</el-link>
              <el-link type="info" @click="registerForm('LoginForm')">忘记用户名</el-link>
              <el-link type="primary" @click="registerForm('LoginForm')">注册</el-link>
            </div>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios'

  axios.get("/api/login_verifycode").then(function(response){
    let data=response.data;
    let ans=data.answer;
    document.getElementById("verify_code_img").setAttribute("src",data.url);
  })

  export default {
    name: 'login',
    data() {
      return {
        LoginForm: {
          username: '',
          password: '',
          verifyCode:''
        },
        LoginRules: {
          username: [
            { required: true, message: '请输入登录用户名', trigger: 'blur' },
            { min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入登录密码', trigger: 'blur' },
            { min: 3, max: 17, message: '长度在 3 到 17 个字符', trigger: 'blur' }
          ],
          verifyCode: [
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          // 判断用户输入是否合法
          if (valid) {
            let params = {
                'username' : this.LoginForm.username,
                'password' : this.LoginForm.password,
                'verifyCode': this.LoginForm.verifyCode,
            }
            var _this = this;
            axios.post('/api/login', params)
              .then(function(response){
                let data = response.data;
                console.log(data);
                if(data.statusCode===200){
                  console.log(data.loginUser);
                  _this.$router.push('/workSpace');
                  //600 验证码错误
                  //500 用户名或密码错误
                }else{
                  //
                  alert('用户名或密码错误');
                  return false;
                }
              })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      registerForm(formName) {
        this.$router.push("/register");
      },
      change(){
        axios.get("/api/login_verifycode").then(function(response){
          let data=response.data;
          document.getElementById("verify_code_img").setAttribute("src",data.url);
        })
      }
    }
  }
</script>

<style lang="less" scoped>

  .login_container{
    background:url("../assets/img/bg2.jpg");
    width:100%;			//大小设置为100%
    height:100%;			//大小设置为100%
    //width: 1440px;
    //height: 823px;
    overflow: auto;
    position:fixed;
    background-size:100% 100%;
  }

  .login_header{
    width: 1440px;
    height: 40px;
    background-color: rgba(255,255,255,0.5);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);

    .header_icon{
      width: 70px;
      height: 70px;
      position: absolute;
      /*top: 0.01%;*/
      bottom: 91%;
      left:0.5%;
    }

    .login_title{
      width:400px;
      position: absolute;
      top: 2%;
      left: 5%;
      font-size: 40px;
      font-weight: bold;
      letter-spacing: 2px;
    }
  }

  .login_box{
    width: 350px;
    height: 350px;
    border: 7px solid rgba(255,255,255,0.2);
    background-color: rgba(255,255,255,0.9);
    border-radius: 7px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
    position: absolute;
    left: 79%;
    top: 50%;
    transform: translate(-50%,-50%);

    .avatar_box{
      width: 110px;
      height: 110px;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      padding:10px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin: -65px auto;
      /*background-color: rgba(148,193,235,0.2);*/
      background-color: rgba(255,255,255,0.2);

      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eeeeee;
      }
    }
    .Login_Form{
      position: absolute;
      bottom: 20%;
      width: 100%;
      padding: 10px;
      right: 2px;
      box-sizing: border-box;

      .Login_Btn{
        /*display: flex;*/
        /*justify-content: flex-end;*/
        position: absolute;
        /*left: 0.1%;*/
      }
      .link_group{
        position: absolute;
        right: 2%;
        top: 120%;
      }

      .verifyCode_box{
        display: flex;
        .verifyCode{
          width: 70%;
          /*padding-left: 10px;*/
          justify-content: left;
        }
      }
      .verify_img{
        width: 30%;
        height: 45px;
        justify-content: flex-end;
        padding-left: 10px;

      }
    }
  }

</style>
