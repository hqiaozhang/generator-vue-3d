<template>
   <a-scene>
    <!-- 背景 -->
    <!-- <a-sky src="https://c1.staticflickr.com/8/7376/16218590470_468084c950_h.jpg"></a-sky> -->
    <!-- 球体 -->
    <!-- <a-sphere id="sphere" position="0 1.25 -5" radius="1.25" color="#66ffcc"></a-sphere> -->
    <!-- 盒子 -->
    <!-- <a-box color="red" position="0 2 -5" rotation="0 45 45" scale="2 2 2"></a-box> -->
      <a-assets>
        <img id="city" :src="`http://${location.host}/static/images/3.jpg`">
      </a-assets>
      <a-sky :src="`http://${location.host}/static/images/room.jpg`"></a-sky>
      <a-entity>
        <a-box src="#city"  position="0 1 -4" rotation="0 45 0">
          <a-animation attribute="rotation"  to="0 360 0"  dur="5000"
            repeat="indefinite"></a-animation>
        </a-box>
        <a-box src="#city"  position="-2 1 -4" rotation="45 0 0" />>
      </a-entity>
      <!-- 添加相机后才能有点击事件 -->
      <a-camera>
        <a-cursor color="red"></a-cursor>
      </a-camera>
      <!-- ==================== -->
      
    </a-scene>
</template>



<script>

export default {
  data() {
    return {
      location: location
    }
  },
  mounted() {
    var boxEl = document.querySelector("a-box");
    var camera = document.querySelector('a-entity[camera]')
    console.log('camera', camera)
    boxEl.addEventListener("click", function() {
      console.log('xxxxxxxxx')
      // boxEl.setAttribute("scale", { x: 3, y: 3, z: 3 });
    });
  },
  methods: {}
};
</script>