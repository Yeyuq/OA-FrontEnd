<template>
  <div class="workspace_box">
    <div class="header_box">
      <el-header
        style="text-align: left;height: 40px;position:absolute;bottom:102.9%;z-index: 1;font-size: 17px;font-family: 微软雅黑;padding: 0px">
        <i class="el-icon-s-data"></i>首页
      </el-header>
    </div>
    <div class="main_box">
      <!--gutter栅栏间隔-->
      <el-row :gutter="27">
        <div class="row_1">
          <el-col :span="6">
            <div class="grid-content1 one">
              <div style="height: 20px;position: absolute;bottom: 122%;left: 2%;font-size: 15px">
                <p style="color: #909399">本月已出勤天数：</p>
                <p style="color: #B3D8FF;position: absolute;top: 9%;left: 109%">7</p>
              </div>
              <!--<div style="height:34px;position: absolute;bottom: 134%;left: 12.2%">-->
              <!--<p style="font-size: 52px;color: #B3D8FF;">7</p>-->
              <!--</div>-->
              <div style="height: 20px;position: absolute;bottom: 97%;left: 2%;font-size: 15px">
                <p style="color: #909399">本月未出勤天数：</p>
                <p style="color: #C25555;position: absolute;top: 9%;left: 109%">12</p>
              </div>
              <div style="position: absolute;bottom:7%;left: 17.9%;width: 34px;">
                <el-button round type="primary" style="background-color: #409EFF;border-color: #C6E2FF;"
                           @click="to_work()">上班
                </el-button>
              </div>
              <div style="position: absolute;top:19%;left: 17.9%;width: 34px">
                <el-button round type="primary" style="background-color: white;border-color: #C6E2FF;color: #409EFF"
                           @click="off_work()">下班
                </el-button>
              </div>
              <div
                style="z-index: 1;position: absolute;left: 2%;bottom:48%;color: #909399;height: 40px;font-size: 15px">
                {{ nowTime }}
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content1 one"></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content1 one">
              <div style="height: 40px;width: 40%;position: absolute;left: 54.7%;bottom: 72%">
                <el-input placeholder="请输入用户名称或ID" v-model="input1" class="input-with-select"
                          prefix-icon="el-icon-search">
                  <!--<el-button type="primary" slot="append" icon="el-icon-search"></el-button>-->
                  <el-button type="primary" slot="append" icon="el-icon-search" style="color: #409EFF"></el-button>
                </el-input>
              </div>
            </div>
          </el-col>
        </div>
      </el-row>
      <el-row :gutter="27">
        <div class="row_2">
          <el-col :span="6">
            <div class="grid-content2 one">
              <div class="calendar_wrap" style="height: 100%;width: 97.9%;line-height: 7px">
                <el-calendar v-model="value" class="calendar_1">
                  <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                    <div slot="reference" class="div-Calendar" @click="openPlan(data.day)">
                      <div class="calendar-day">
                        {{ data.day.split('-').slice(2)[0] }} {{ ret_list[data.day] ? "*":" " }}
                      </div>
                    </div>
                  </template>
                </el-calendar>
                <dialogForm ref="mychild" :yourdata="yourdata" :formtodolist="formtodolist"></dialogForm>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content2 one"></div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content2 one"></div>
          </el-col>
        </div>
      </el-row>
      <el-row :gutter="27">
        <div class="row_3">
          <el-col :span="12">
            <div class="grid-content3 one"></div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content3 one"></div>
          </el-col>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import dialogForm from '@/components/user/dialogForm'
import axios from 'axios'

var timer = null
export default {
  name: 'workspace',
  components: {
    dialogForm
  },
  data () {
    return {
      input1: '',
      value: new Date(),
      today: new Date().getDate(),
      nowTime: '',
      yourdata: '',
      formtodolist: {},
      isFilled: '',
      ret_list: {},
    }
  },
  // created: function() {
  //   let prevBtn3 = document.querySelector('.el-calendar__button-group > div > button:nth-child(3)');
  //   prevBtn3.addEventListener('click',() => {
  //     console.log('下个月');
  //   });
  // },
  created () {
    this.havePlan()
  },
  methods: {
    judgmentDate (date) {
      return date.getTime() < Date.now()
    },
    // 查询所有工作计划
    havePlan () {
      console.log("init....")
      var _this = this
      axios.get('/api/day_boolean').then(function (response) {
        _this.ret_list =  JSON.parse(JSON.stringify(response.data.ret_list))
        // list.forEach(item => {
        //   if (item.time === day) {
        //     console.log(item.time)
        //     this.flag = item.flag;
        //     console.log("match")
        //   }
        //})
        // console.log(data.dayBoolean);
      })
      // console.log(day);
    },
    openPlan (day) {
      clearTimeout(timer)
      // 把day日期和当前日期进行比对
      // 如果这个day是以前的日期，则不允许修改工作计划
      timer = setTimeout(() => {
        // console.log(day);
        this.$refs.mychild.dialogFormVisible = true
        // alert(day);
        this.yourdata = day
        this.$nextTick(function () {
          axios.get('/api/scheduleform').then(response => {
            this.formtodolist = JSON.parse(JSON.stringify(response.data))
          })
        })
        // console.log(this.yourData);
      }, 200)
    },

    timeFormate (timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
      let date = new Date(timeStamp).getDate() < 10 ? '0' + new Date(timeStamp).getDate() : new Date(timeStamp).getDate()
      let hh = new Date(timeStamp).getHours() < 10 ? '0' + new Date(timeStamp).getHours() : new Date(timeStamp).getHours()
      let mm = new Date(timeStamp).getMinutes() < 10 ? '0' + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes()
      let ss = new Date(timeStamp).getSeconds() < 10 ? '0' + new Date(timeStamp).getSeconds() : new Date(timeStamp).getSeconds()
      this.nowTime = year + '.' + month + '.' + date + '  ' + '星期' + '日一二三四五六'.charAt(new Date().getDay()) + ' ' + hh + ':' + mm + ':' + ss
    },
    nowTimes () {
      this.timeFormate(new Date())
      setInterval(this.nowTimes, 1000)
      // console.log(this.nowTimes);
      this.clear()
    },
    clear () {
      clearInterval(this.nowTimes)
      this.nowTimes = null
    },
    to_work () {
      alert('打卡成功！')
    },
    off_work () {
      alert('下班！')
    }
  },
  mounted () {
    this.nowTimes()
  },
  beforeDestroy () {
    this.clear()
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 5px;
  /*top: ;*/
}

.one {
  background: white;
  box-shadow: 0 1px 9px 0 rgba(64, 158, 255, 0.1);
  /*box-shadow: 0 1px 9px 0 rgba(0, 0, 0, 0.1);*/
}

/*.two {*/
/*background: white;*/
/*box-shadow: 0 2px 12px 0 rgba(64, 158, 255, 0.2);*/
/*}*/
/*.three {*/
/*background: white;*/
/*box-shadow: 0 2px 12px 0 rgba(64, 158, 255, 0.2);*/
/*}*/
.grid-content1 {
  border-radius: 5px;
  min-height: 117px;
  margin-top: 20px;
}

.row_1 {
  margin-left: 7px;
  margin-right: 7px;
}

.row_2 {
  margin-left: 7px;
  margin-right: 7px;
}

.row_3 {
  margin-left: 7px;
  margin-right: 7px;
}

.grid-content2 {
  border-radius: 5px;
  min-height: 340px;
  margin-top: 10px;
}

.grid-content3 {
  border-radius: 5px;
  min-height: 117px;
  margin-top: 10px;
}

.is-selected {
  color: #1989FA;
}

.grid-content2 /deep/ .el-calendar-table .el-calendar-day {
  height: 34px;
  width: 34px;
}

.grid-content2 /deep/ .el-calendar__title {
  font-size: 7px;
}

.grid-content2 /deep/ .el-button-group {
  width: 190px;
}

.grid-content2 /deep/ .el-calendar__header {
  padding: 12px 2px;
}

//.workspace_box{
//  width: 1200px;
//  height: 720px;
//  overflow: auto;
//}

.main_box {
  width: 1200px;
  height: 700px;
  //overflow: auto;
}

//.header_box{
//  overflow: hidden;
//}
</style>
