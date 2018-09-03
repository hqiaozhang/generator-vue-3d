<template>
   <a-scene  background="color: #24CAFF">
      <a-assets>
        <a-asset-item id="tree" :src="`http://${location.host}/static/models/tree1/tree1.dae`"></a-asset-item>
      </a-assets>

      <!-- Quasi-isometric camera -->
      <a-entity>
        <a-animation attribute="position" from="0 5 0" to="0 0 0" dur="4000"
                     easing="ease-out"></a-animation>
       <!-- position y 越小越往上走, z越小越往下 -->
        <a-entity position="0 880 1290" rotation="-34 0 0">
           <!-- fov参数越小，实体越大 -->
           <a-camera id="camera" near="1000" far="4000" fov="2.2" 
            wasd-controls-enabled="false" 
            look-controls-enabled="false">
           </a-camera>
        </a-entity>  
      </a-entity>

      <a-entity id="logo" rotation="0 45 0">
        <!-- Right side -->
        <a-entity rotation="-20 0 0" position="0 0 10.75" scale="1 0 1">
          <a-animation attribute="scale" to="1 1 1" delay="200" dur="1000"
                       easing="ease-out"></a-animation>
          <a-box width="12.5" depth="1" height="30" color="#EF2D5E" position="0 15 0">

            <!-- Left side -->
            <a-entity rotation="-140 0 0" position="0 15 0" scale="1 0 1">
              <a-animation attribute="scale" to="1 1 1" delay="800" dur="800"
                           easing="ease-out"></a-animation>
              <!-- 挖空背面 -->
              <!-- <a-box width="12.49" depth=".1" height="30" color="#24CAFF"
                      position="0 15 -.52" shader="flat"></a-box> -->
              <a-box width="12.5" depth="1" height="30" color="#EF2D5E"
                      position="0 15 0"></a-box>
            </a-entity>
          </a-box>
        </a-entity>

        <!-- Cross-bar(黄色部分) -->
        <a-entity rotation="-90 0 0" position="0 8 7.5" scale="1 0 1">
          <a-animation attribute="scale" to="1 1 1" delay="800" dur="600"
                       easing="ease-out"></a-animation>
          <a-box width="12.45" depth=".1" height="14" color="#F2E646"
                 position="0 7 .52" shader="flat"></a-box>
          <a-box width="12.5" depth="1" height="14" color="#EF2D5E"
                 position="0 7 0"></a-box>
        </a-entity>

      <!-- Shadow -->
        <a-entity rotation="-90 0 0">
          <a-plane width="12.5" height="20" position="0 0 0.1" pivot="0 -10 0"
                   color="#21897C">
            <a-animation attribute="scale" from="1 0 1" to="1 1 1" easing="ease-out"
                         delay="600" dur="1000" fill="both"></a-animation>
          </a-plane>
        </a-entity>

        <!-- Base(地面) -->
        <a-entity>
          <a-plane width="30" height="30" color="#249889" rotation="-90 0 0">
            <!-- <a-animation attribute="position" from="0 -40 0" to="0 0 0" dur="1600"
                         easing="ease-out"></a-animation> -->
          </a-plane>
        </a-entity>   

        <!-- Trees -->
        <a-entity position="-10 0.2 -10">
          <a-collada-model src="#tree" scale="2.5 2.5 2.5" visible="false">
            <a-animation attribute="position" from="0 10 0" to="0 0 0" delay="650" dur="800"
                         easing="ease-out" fill="backwards"></a-animation>
            <a-animation attribute="visible" to="true" delay="800" dur="1"></a-animation>
          </a-collada-model>
        </a-entity> 

    </a-entity>
  </a-scene>
</template>

<script>
export default {
  data() {
    return {
      location: location
    };
  }
};
</script>


