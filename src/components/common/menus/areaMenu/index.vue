/*
* @Author: zhanghongqia
* @email: 991034150@qq.com
* @Date: 2018-06-08 21:37:15
* @Description: 地区列表
* @Last Modified by: zhanghongqiao
* @Last Modified time: 2018-07-27 17:59:29
*/

<template>
  <div class="area-menu">
    <p v-clickoutside="handleClose" @click="handleName">
      <span>{{defaultName}}</span><i class="icon-down"></i>
    </p>
    <ul v-show="isShow" class="area-list">
      <li v-for="item in areaList" :key="item.id" @click="handleSelect(item)">
        {{item.domainName}}
      </li>
    </ul>
  </div>
</template>

<script>
  import './index.scss'
  import {setCookie} from '@/util/util'
  import {clickoutside} from '@/util/util.js'

  export default {
    data() {
      return {
        isShow: false,
        activeIndex: '1',
        defaultName: '' // 默认显示的城市名
      }
    },
    props: {
      areaList: Array,
      cityName: String
    },
    directives: {clickoutside},
    mounted() {
      this.defaultName = this.cityName
    },

    methods: {
      handleSelect(item) {
        this.isShow = false
        this.defaultName = item.domainName
        this.$store.commit('setAreaInfo', item)
        setCookie("cityId", item.id)
        setCookie("provinceId", item.parentId)
        setCookie("cityName", item.domainName)
        setCookie("cityType", item.cityType)
      },
      handleName() {
        this.isShow = !this.isShow
      },
      /**关闭面板 */
      handleClose() {
        this.isShow = false
      }
    },
    watch: {
      // 监听地区名
      'cityName': function () {
        this.defaultName = this.cityName
      }
    }
  }
</script>
 