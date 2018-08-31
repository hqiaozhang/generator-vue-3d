<template>
   <a-scene>
    <!-- 背景 -->
    <!-- <a-sky src="https://c1.staticflickr.com/8/7376/16218590470_468084c950_h.jpg"></a-sky> -->
    <!-- 球体 -->
    <!-- <a-sphere id="sphere" position="0 1.25 -5" radius="1.25" color="#66ffcc"></a-sphere> -->
    <!-- 盒子 -->
    <!-- <a-box color="red" position="0 2 -5" rotation="0 45 45" scale="2 2 2"></a-box> -->
      <a-assets>
        <img id="boxTexture" src="https://i.imgur.com/mYmmbrp.jpg">
      </a-assets>
      <a-box src="#boxTexture" position="0 2 -5" rotation="0 45 45" scale="2 2 2">
        <a-animation attribute="position" to="0 2.2 -5" direction="alternate" dur="2000"
          repeat="indefinite"></a-animation>
      </a-box>

      <!-- 添加相机后才能有点击事件 -->
      <a-camera>
        <a-cursor color="#fff"></a-cursor>
      </a-camera>
      <!-- ==================== -->
      
    </a-scene>
</template>



<script>

export default {
  mounted() {
    var boxEl = document.querySelector("a-box");
    boxEl.addEventListener("click", function() {
      console.log('xxxxxxxxx')
      boxEl.setAttribute("scale", { x: 3, y: 3, z: 3 });
    });
  },
  methods: {}
};
</script>