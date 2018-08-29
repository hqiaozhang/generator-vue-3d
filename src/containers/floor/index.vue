/*
 * @Author: zhanghongqiao 
 * @Date: 2018-08-29 14:06:01 
 * @Email: 991034150@qq.com 
 * @Description: 楼宇
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-29 16:46:20
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
  <a-assets>
    <img id="texture" :src="`http://${location.host}/static/images/2.jpg`">
  </a-assets>

  <a-box color="#FFF" width="4" height="10" depth="2"
         position="-10 2 -5" rotation="0 0 45" scale="2 0.5 3"
          >
    <!-- Animation will only play when the box is clicked. -->
    <a-animation attribute="rotation" begin="click" repeat="indefinite" to="0 360 0"></a-animation>
  </a-box>

  <a-camera position="0 1.8 0">
    <a-cursor color="#2E3A87" />
  </a-camera>
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
    var box = document.querySelector('a-box');
    box.addEventListener('mouseenter', function () {
      box.setAttribute('scale', {
        x: 4,
        y: 1,
        z: 6
      });
    });
  }
}
</script>

 
 
