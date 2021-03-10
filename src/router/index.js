import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',//把Router的mode修改为history模式,VueRouter默认的模式为HASH模式
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../components/login.vue')
    },
    {
      path: '/userMain',
      name: 'UserMain',
      component: () => import('../components/userMain.vue'),
      meta: {title: '首页'},
      children: [
        {
          path: '/users',
          name: 'Users',
          component: () => import('../components/user/Users.vue'),
        },
        {
          path: '/userSetting',
          name: 'UserSetting',
          component: () => import('../components/user/UserSetting.vue'),
          meta: {title:'个人信息设置'}
        },
        {
          path: '/workspace',
          name: 'workspace',
          component: () => import('../components/user/workspace.vue'),
          meta: {title:'work'}
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../components/register.vue')
    }
  ]
})
