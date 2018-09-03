/*
 * @Author: zhanghongqiao 
 * @Date: 2018-08-29 14:06:01 
 * @Email: 991034150@qq.com 
 * @Description: 楼宇
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-09-03 21:51:34
 */

<style lang="scss" scoped>
  .floor-container {
    width: 100%;
    height: 100%;
  }
</style>
  
 <template>
   <div class="floor-container">
     <!-- <ImageGallery /> -->
     <item2 />
   </div>
 </template>


<script>
import * as components from "./components/index.js";

export default {
  data() {
    return {
      location: location
    };
  },
  components: {
    ...components
  },

  mounted() {
  },
  methods: {}
};
</script>

 
 
