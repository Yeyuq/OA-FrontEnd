import Mock from 'mockjs'
import Random from 'mockjs'

Mock.mock('/api/login', 'post', function (params) {
  let data = JSON.parse(params.body);
  let username = data.username;
  let password = data.password;
  let verifyCode = data.verifyCode;

  console.log("用户名："+username+"\n"+"密码："+password+"\n"+"验证码"+verifyCode);

  let isAdmin;
  if(username==='admin'){
    isAdmin = true;
  }else{
    isAdmin = false;
  }

  return Mock.mock({
    statusCode: 200,
    loginUser: username,
    isAdmin: isAdmin,
  })
})


Mock.mock('/api/login_verifycode','get',function(){
  let answer = Mock.mock({'regexp': /\w{4}/}).regexp
  return Mock.mock({
    url:Mock.Random.dataImage('50x20', answer),
  })
})

Mock.mock('/api/register', 'post', function (params) {
  let data = JSON.parse(params.body);
  let username = data.username;
  let password = data.password;
  let email = data.email;

  console.log("邮箱："+email+"\n"+"用户名："+username+"\n"+"密码："+password);

  return Mock.mock({
    statusCode:300
  })
  // 返回呢？？？？ 怎么知道能不能让他注册
})

Mock.mock('/api/dialogform','post',function (params){
  let data=JSON.parse(params.body);
  // sdjsjas
  /*

    {"ishave":true, "todo_list":[{"time":"13:41","shiqing":"xiezipue"，"status"：""},{""},{}]}
   */
  let schedule=data.schedule;
  // let time=data.time;
  let nowdate=data.nowdata;
  // let ischeck=data.ischeck;
  console.log(data)

  console.log("当前日期为："+nowdate+"\n"+"当日日程为："+schedule);
  return Mock.mock({
    statusCode:200
  })
})

// user date
Mock.mock('/api/scheduleform','get',function(){

  const Random=Mock.Random;
  // const worktime=Mock.mock({
  //   dateTime: Random.datetime()
  // })

  let todoList = [{
    status : 200,
    index:0,
    // work:Random.cparagraph(1, 2),
    work: "adnslakxmabnxmxhoksaxnzcokxzhasdonsckzbqwertiosnjcnxzcnxznckasnsakdskncjxzbcjxznlzmxksadnisoajdskncjxbcjxbvcnosaxmkzmsinsxmkznxjzbcxiz",
    // time:Random.datetime(),hsoajdmxkzn
    isFinished:false,
  },{
    status: 200,
    index: 1,
    work:Random.cparagraph(1, 2),
    // time:Random.datetime(),
    isFinished: false,
  },{
    status: 200,
    index: 2,
    work:Random.cparagraph(1, 2),
    // time:Random.datetime(),
    isFinished: true,
  }]
  return Mock.mock({
    todoList:todoList,
  })
})

Mock.mock('/api/changeform','post',function (params){
  let data=JSON.parse(params.body);

  // let finishIndex=data.finishIndex;
  let delIndex=data.delIndex;
  let finishIndex=data.finishIndex;

  // console.log(params)

  console.log("当前删除项为："+delIndex+"\n"+"当前完成项为："+finishIndex);
  return Mock.mock({
    statusCode:201,
  })
})





