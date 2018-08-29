/*
* @Author: zhanghongqia
* @email: 991034150@qq.com
* @Date: 2018-06-08 21:38:20
* @Description: 顶部菜单导航
* @Last Modified by: zhanghongqiao
* @Last Modified time: 2018-07-19 22:15:38
*/

<template>
  <div class="header">
    <div class="logo-bg"></div>
    <div class="left-logo"></div>
    <!--菜单开始-->
    <div class="top-menus">
      <!--导航菜单-->
      <NavMenus :navMenus="menuList" :topActiveId="topActiveId" />
    </div>
    <!--右边导航部分-->
    <div class="right-select">
      <AppIcon/> <!--app 图标-->
      <!--地区选择菜单-->
      <AreaMenu :areaList="areaList" :cityName="cityName" />
      <!--系统设置菜单-->
      <Seting :logout="logout" :requestChangePwd="requestChangePwd"/>
    </div>
  </div>
</template>

<script>
  import './index.scss'
  import AreaMenu from '../areaMenu'
  import Seting from '../seting/index.vue'
  import AppIcon from '../seting/appIcon'
  import NavMenus from './navMenu.vue'

  export default {
    components: {
      AreaMenu,
      Seting,
      NavMenus,
      AppIcon
    },
    props: {
      menuList: Array,
      areaList: Array,
      logout: Function,
      requestChangePwd: Function,
      topActiveId: Seting,
      cityName: String,
    },
    data() {
      return {
        currenIndex: 0,
        hasError: false,
        menus: '',
        level: 0
      }
    }
  }
</script>


