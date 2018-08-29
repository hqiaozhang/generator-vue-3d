/*
 * @Author: zhanghongqiao
 * @Date: 2018-05-29 21:07:35 
 * @Description: 路由配置
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-29 14:33:38
 */

import Vue from 'vue'
import Router from 'vue-router'
// 注册Router
Vue.use(Router)
// 登录
const Login = () => import('@/containers/login/index.vue')
// 首页
const Home = () => import('@/containers/home/index.vue')

// 楼层
const Floor = () => import('@/containers/floor/index.vue')



const routes = [
  {
    path: '*',
    redirect: '/center-web/home',
    component: Floor // 首页
  },
  {
    path: '/weather-web/login', // 登录
    name: '登录',
    components: {
      login: Login
    } 
  },{
    path: '/center-web/home',
    name: '首页',
    component: Floor // 首页
  }
]


export default new Router({
  mode: 'history',
  routes
})
