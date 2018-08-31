/*
 * @Author: zhanghongqiao 
 * @Date: 2018-08-29 14:06:01 
 * @Email: 991034150@qq.com 
 * @Description: 楼宇
 * @Last Modified by: zhanghongqiao
 * @Last Modified time: 2018-08-31 15:16:48
 */

<style lang="scss" scoped>
  .floor-container {
    width: 100%;
    height: 100%;
  }
</style>
  
 <template>
   <div class="floor-container">
     <ImageGallery />
   </div>
 </template>


<script>
import {ImageGallery} from "./components/index.js";

export default {
  data() {
    return {
      location: location
    };
  },
  components: {
    ImageGallery
  },

  mounted() {
  },
  methods: {}
};
</script>

 
 
