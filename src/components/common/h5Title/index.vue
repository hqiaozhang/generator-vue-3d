<template>
  <div class="h5-title-common">
    <div class="content">{{title}}</div> 
    <span class="icon-lefttop"></span> 
    <span class="icon-leftbottom"></span> 
    <span class="icon-righttop"></span> 
    <span class="icon-rightbottom"></span>
  </div>
</template>

<script>
import './index.scss'
// 标题
export default {
  name: 'h5-title',
  props:  {
    title: String
  }
} 
</script>