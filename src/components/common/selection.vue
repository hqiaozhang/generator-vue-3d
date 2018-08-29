/*
 * @Author: zhanghongqiao 
 * @Date: 2018-07-12 14:18:59 
 * @Email: 991034150@qq.com 
 * @Description: selection组件
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-07-30 16:54:55
 */

 <style scoped>
.selection-component {
  position: relative;
  display: inline-block;
}
.selection-show {
  border: 1px solid #e3e3e3;
  padding: 0 20px 0 10px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 25px;
  line-height: 25px;
  border-radius: 3px;
  background: #fff;
}
.selection-show span {
  color: #ccc;
}
.selection-show span.active {
  color: #000;
}
.selection-show .arrow {
  display: inline-block;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #e3e3e3;
  width: 0;
  height: 0;
  margin-top: -1px;
  margin-left: 6px;
  margin-right: -14px;
  vertical-align: middle;
}
.selection-list {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 25px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  z-index: 5;
}
.selection-list li {
  padding: 5px 15px 5px 10px;
  border-left: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  cursor: pointer;
  background: #fff;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */

}
.selection-list li:hover {
  background: #e3e3e3;
}
</style>

<template>
    <div class="selection-component">
      <!-- 默认展示 label -->
      <div class="selection-show" @click="toggleDrop">
        <span :class="{'active': !isActive}" v-html="selections[nowIndex].label"></span>
        <div class="arrow"></div>
      </div>
      <!-- 下拉label -->
      <div class="selection-list" v-if="isDrop">
        <ul>
          <li v-for="(item, index) in selections" :key="index" 
           @click="chooseSelection(index)" v-html="item.label"></li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    isGray: Boolean, // 默认是否重灰
    selections: {
      type: Array,
      default: [{
        label: 'test',
        value: 0
      }]
    }
  },
  data () {
    return {
      isDrop: false, // 是否展开select
      isActive: false,
      nowIndex: 0
    }
  },
  mounted() {
    this.isActive = this.isGray
  },
  methods: {
    toggleDrop () {
      this.isDrop = !this.isDrop
    },
    chooseSelection (index) {
      this.nowIndex = index
      this.isDrop = false
      this.isActive = true // 是否点击了select(默认灰色展示，点击了高亮)
      let { label } = this.selections[this.nowIndex]
      if(label === '请选择') {
        this.isActive = false
      }
      this.$emit('on-change', this.selections[this.nowIndex])
    }
  }
}
</script>


