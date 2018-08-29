/*
* @Author: zhanghongqia
* @email: 991034150@qq.com
* @Date: 2018-06-10 18:27:03
* @Description: 应用程序模板入口
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-29 14:48:51
*/

<style lang="scss" scoped>
  .main-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>

<template>
  <div id="app">
    <!-- 未登录状态 -->
    <div class="main-container clearfix">
      <router-view />
    </div>
  </div>
</template>