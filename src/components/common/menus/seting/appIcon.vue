/*
* @Author: zhanghongqiao
* @Date: 2018-07-23 17:53:16
* @Email: 991034150@qq.com
* @Description: 设置菜单
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-29 13:51:49
*/


<style lang="scss" scoped>
  .app-icon {
    float: left;
    position: relative;
    color: #a5abbb;
    height: 40px;
    line-height: 40px;
    width: 58px;
    &:hover .qr-code {
      display: block
    }
    span {
      position: absolute;
      cursor: pointer;
      background: url(./images/app-icon.png) no-repeat center;
      padding-right: 55px;

    }
    .qr-code {
      width: 128px;
      height: 157px;
      background: url(./images/qr-code.png) no-repeat;
      position: absolute;
      top: 31px;
      display: none;
      right: -22px;
      .text {
        float: left;
        width: 100%;

        color: #000;
        text-align: center;
        font-size: 14px;
        height: 30px;
        line-height: 30px;
      }
      .code-img {
        width: 104px;
        height: 104px;
        margin: 16px 0 0 12px;
        background: #ccc;
      }
    }
  }
  /* ----------绿色主题 ----------*/
  .theme-green {
    .app-icon {
      color: #fff;
    }
  }
</style>

<template>
  <div class="app-icon">
    <span><i></i>APP</span>
    <div class="qr-code">
      <div id="J-code-img" class="code-img"></div>
      <div class="text">安卓版本下载</div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'

 



