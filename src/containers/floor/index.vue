/*
 * @Author: zhanghongqiao 
 * @Date: 2018-08-29 14:06:01 
 * @Email: 991034150@qq.com 
 * @Description: 楼宇
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-29 22:57:54
 */

  <style lang="scss" scoped>
  .floor-container {
    width: 100%;
    height: 100%;
  }
  </style>
  

 <template>
   <div class="floor-container">
      <a-scene>
        <a-box color="red" width="3"></a-box>
       <a-entity geometry="primitive: box; width: 3" material="color: red"></a-entity>

        <!-- <a-sky :src="`http://${location.host}/static/images/3.jpg`" /> -->
      </a-scene>
   </div>
 </template>


<script>
export default {
  data() {
    return {
      location: location
    }
  },
  mounted() {
 
  }
}
</script>

 
 
