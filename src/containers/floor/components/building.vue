<style lang="scss" scoped>
.scene {
  background: -webkit-radial-gradient(#189199, #0a374e); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient(#189199, #0a374e); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient(#189199, #0a374e); /* Firefox 3.6 - 15 */
  background: radial-gradient(
    #189199,
    #0a374e
  ); /* 标准的语法（必须放在最后） */
}
</style>

<template>
  <a-scene vr-mode-ui="enabled: false" class="scene">

    <a-assets>
      <img id="plane" :src="`http://${location.host}/static/images/plane.png`">
      <img id="bg1" :src="`http://${location.host}/static/images/bg1.png`">
    </a-assets>

  <a-entity position="0 0 5">
    <a-camera reverse-mouse-drag="true">
      <a-cursor color="red"></a-cursor>
    </a-camera>
  </a-entity>


    <a-entity id="building">
      <a-box id="box" 
   
      
      position="0 1 1" height="2" rotation="5 45 5" src="#bg1">
      <!-- <a-animation attribute="rotation"  to="-5 360 5"  dur="5000"
            repeat="indefinite"></a-animation> -->
      </a-box> 
 

      <a-plane src="#plane" width="4" height="4" color="#e1e1e1" rotation="-90 45 0" />
    </a-entity>
  </a-scene>
</template>


<script>
export default {
  data() {
    return {
      location: location
    };
  },
  mounted() {
    let box = document.querySelector("#box");
    box.addEventListener("click", function() {
      console.log("xxxxxxxxxxxxx");
    });
  }
};
</script>



