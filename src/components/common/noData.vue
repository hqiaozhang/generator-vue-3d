/*
* @Author: zhanghongqia
* @email: 991034150@qq.com
* @Date: 2018-08-03 17:16:26
* @Description: 暂无数据
* @Last Modified by: zhanghongqiao
* @Last Modified time: 2018-08-03 17:16:26
*/
<template>
  <div class="no-data" v-if="isEmpty(data)">暂无数据</div>
</template>

<script>
  import  { isEmpty } from 'lodash'
  export default {
    props: ['data'],
    name: "noData",
    methods: {
      isEmpty: isEmpty
    }
  }
</script>
