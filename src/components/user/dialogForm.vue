<template>
  <div class="dialog_box">
    <el-dialog title="工作计划" :visible.sync="dialogFormVisible" :v-if="dialogFormVisible" class="list_form" >
<!--      <hr style='background-color:rgb(232,243,255); height:1px; border:none;'/>-->
      <p>{{ nowData }}</p>
      <hr style='background-color:rgb(232,243,255); height:1px;width: 79%; border:none;'/>
      <div class="tasks">
        <ul style="line-height: 27px;word-wrap: break-word;text-align: left">
          <li v-for="(item,index) in formtodolist.todoList" id="ul_box" class="list_box">
            <div class="list_checkbox">
              <input :class="{finished:item.isFinished}" type="checkbox" @click="delText(item)"
                     v-model="item.isFinished"></input>
              </div>
            <div class="list_label">
              <label :class="{labelFinished:item.isFinished}" v-model="item.isFinished">{{ index + 1 }}.{{ item.work }}</label>
            </div>
            <div class="list_btn">
              <el-button class="destroy" @click="delFn(item)" size="mini" circle></el-button>
            </div>
          </li>
        </ul>
      </div>
      <el-form :model="form" :rules="rules" ref="form" class="input_box">
        <el-form-item  prop="schedule">
          <el-input class="input_content" v-model="form.schedule" autocomplete="off" placeholder="在此添加新的工作计划"></el-input>
        </el-form-item>
<!--        <el-form-item label="截止时间" :label-width="formLabelWidth" prop="time" class="input_time">-->
<!--          <el-input v-model="form.time" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">关 闭</el-button>
        <el-button type="primary" @click="confirm('form')">添 加</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'dialogForm',
  props: {
    yourdata: String,
    formtodolist: {}
  },
  data () {
    return {
      dialogFormVisible: false,
      nowData: this.yourdata,
      btn_check: 'false',
      delIndex: '',
      finishIndex: '',
      // isFinished:'',
      form: {
        schedule: '',
        // time: '',
      },
      formLabelWidth: '120px',
      rules: {
        schedule: [
          {required: true, message: '请输入工作日程', trigger: 'blur'},
        ],
        // time: [
        //   {required: true, message: '请填写截止时间', trigger: 'blur'}
        // ]
      }
    }
  },
  watch: {
    yourdata: function (val) {
      this.nowData = val
    },
    formtodolist: function (val) {
      this.formtodolist = val
      console.log(val)
    }
  },
  methods: {
    confirm (formName) {
      console.log(this.form.schedule)
      console.log(this.formtodolist)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            'addWork': this.form.schedule,
            'addTime': this.nowData,
            'addIndex': this.formtodolist.todoList.length,
            'isFinished': false,
          }
          this.formtodolist.todoList[this.formtodolist.todoList.length]={
            'work':this.form.schedule,
            'time':this.nowData,
            'status':200,
            'isFinished':false,
          };
          var _this = this
          axios.post('/api/inputform', params)
            .then(function (response) {
              let data = response.data
              console.log(data)
              if (data.statusCode === 201) {
                _this.$message({
                  message: '日程添加成功',
                  type: 'success'
                })
                // _this.dialogFormVisible = false
                _this.$refs['form'].resetFields()
              } else {
                alert('添加失败')
                return false
              }
            })
        } else {
          console.log('error submit!')
          return false
        }
      })
    },
    cancel () {
      this.dialogFormVisible = false
      this.$refs['form'].resetFields()
      // console.log(this.nowData);
    },
    delFn (item) {
      let params = {
        'delIndex': this.formtodolist.todoList.indexOf(item),
      }
      var _this = this
      var num = _this.formtodolist.todoList.indexOf(item)
      _this.formtodolist.todoList.splice(num, 1)
      axios.post('/api/changeform', params)
        .then(function (response) {
          let data = response.data
          console.log(data)
          if (data.statusCode === 201) {
            alert('删除成功')
          } else {
            alert('删除失败')
            return false
          }
        })
    },
    delText (item) {
      console.log('delText')
      let params = {
        'finishIndex': this.formtodolist.todoList.indexOf(item),
      }
      // console.log(item.isFinished);
      if (item.isFinished) {
        item.isFinished = false
      } else {
        item.isFinished = true
      }
      console.log("--------------------");
      console.log(item.isFinished);
      axios.post('/api/changeform', params)
        .then(function (response) {
          let data = response.data
          console.log(data)
          if (data.statusCode === 201) {
            console.log("操作成功")
          } else {
            alert('操作失败')
            return false
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.tasks {
  //border-top: solid 1px rgba(104, 104, 105, 0.2);
  //border-left: solid 1px rgba(104, 104, 105, 0.2);
  //border-right: solid 1px rgba(104, 104, 105, 0.2);
  background-color: rgb(255, 255, 255);
  box-shadow:  5px 5px rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: auto;
  height: 29vh;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  //border-bottom: solid 1px rgba(104, 104, 105, 0.2);
  margin: 0 0 -1px -1px;
}

.destroy:hover {
  border-color: rgb(239, 79, 79);
}

.destroy {
  width: 20px;
  height: 20px;
  margin: 7px;
  background-color: white;
  transition: color .2s ease-out;
}

//hover显示删除按钮
//li:hover .destroy {
//  visibility:visible;
//}

//调整删除按钮内x位置
.el-button--mini.is-circle {
  padding: 2px;
}

.destroy:after {
  content: 'X';
  color: rgb(239, 79, 79);
}

.labelFinished{
  text-decoration: line-through;
}

//list三栏格式
#ul_box{
  display: flex;
}
.list_label{
  flex: 1;
  border-bottom: solid 1px rgba(104, 104, 105, 0.2);
}
.list_checkbox{
  width: 35px;
}
.list_btn{
  width: 35px;
}

//调整dialog大小
.list_form{
  width: 52%;
  left: 24%;
  //height: 200vh;
}

.el-dialog__wrapper{
  //溢出框内容不剪裁，不出现滚动条
  overflow: visible;
}

.dialog_box /deep/.el-dialog__body{
  padding: 2px 10px 0px 10px;
  height: 100%;
}

//调整输入框边距
.input_box{
  padding: 7px;
}
.input_content{
  width: 330px;
  //padding: 0 0;
  //margin-left: 10px;
}

</style>
