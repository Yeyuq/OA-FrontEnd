<template>
  <div>
    <el-dialog title="工作计划" :visible.sync="dialogFormVisible" :v-if="dialogFormVisible">
      <p>{{ nowData }}</p>
      <div class="tasks">
        <ul style="line-height: 27px;word-wrap: break-word;text-align: left">
          <li v-for="(item,index) in formtodolist.todoList" id="ul_box" class="list_box">
            <div class="list_checkbox">
              <input :class="{finished:item.isFinished}" type="checkbox" @click="delText(item)"
                     v-model="item.isFinished"></input>
              </div>
            <div class="list_label">
              <label>{{ index + 1 }}.{{ item.work }}</label>
            </div>
            <div class="list_btn">
              <el-button class="destroy" @click="delFn(item)" size="mini" circle></el-button>
            </div>
          </li>
        </ul>
      </div>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="工作计划" :label-width="formLabelWidth" prop="schedule" class="input_sch">
          <el-input v-model="form.schedule" autocomplete="off"></el-input>
          <div class="show1">
            {{ form.schedule }}
          </div>
        </el-form-item>
        <el-form-item label="截止时间" :label-width="formLabelWidth" prop="time" class="input_time">
          <el-input v-model="form.time" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm('form')" v-model="btn_check">确 定</el-button>
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
        time: '',
      },
      formLabelWidth: '120px',
      rules: {
        schedule: [
          {required: true, message: '请输入工作日程', trigger: 'blur'},
        ],
        time: [
          {required: true, message: '请填写截止时间', trigger: 'blur'}
        ]
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
      console.log(this.formtodolist)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            'schedule': this.form.schedule,
            'time': this.form.time,
            'nowdata': this.nowData,
            'ischeck': this.btn_check,
          }
          var _this = this
          axios.post('/api/dialogform', params)
            .then(function (response) {
              let data = response.data
              console.log(data)
              if (data.statusCode === 200) {
                _this.$message({
                  message: '日程添加成功',
                  type: 'success'
                })
                _this.dialogFormVisible = false
                _this.$refs['form'].resetFields()
              } else {
                alert('请输入内容')
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
      console.log(item.isFinished);
      if (item.isFinished) {
        item.isFinished = false
      } else {
        item.isFinished = true
      }
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
  border-top: solid 1px rgba(104, 104, 105, 0.2);
  border-left: solid 1px rgba(104, 104, 105, 0.2);
  border-right: solid 1px rgba(104, 104, 105, 0.2);
  background-color: rgb(255, 255, 255);
  box-shadow: 0 1px 9px 0 rgba(64, 158, 255, 0.1);
  border-radius: 5px;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

li {
  border-bottom: solid 1px rgba(104, 104, 105, 0.2);
  margin: 0 0 -1px -1px;
}

//.destroy{
//  display: inline-block;
//  width: 20px;
//  height: 20px;
//  border-radius: 7px;
//  margin: 7px;
//  background-color: white;
//  //border-color: #C6E2FF;
//  //color: #409EFF
//}
.destroy:hover {
  border-color: rgb(239, 79, 79);
}

.destroy {
  //display: inline-block;
  //position: absolute;
  //display: none;
  visibility:hidden;
  //display: inline-block;
  //justify-content: flex-end;
  width: 20px;
  height: 20px;
  margin: 7px;
  //font-size: 20px;
  //height: 50%;
  background-color: white;
  transition: color .2s ease-out;
}

li:hover .destroy {
  visibility:visible;
}

.el-button--mini.is-circle {
  padding: 2px;
}

.destroy:after {
  content: 'X';
  color: rgb(239, 79, 79);
}

.finished + label {
  text-decoration: line-through;
}
#ul_box{
  //overflow: hidden;
  display: flex;
}
.list_label{
  flex: 1;
}
.list_checkbox{
  //float: left;
  width: 35px;
}
.list_btn{
  //float: right;
  width: 35px;
}
</style>
