export default {
  model: {
    event: "click",
    zoom: Number,
  },
  props: {
    map: Function
  },
  methods: {
    zoomUp(map) {
      let zoom = map.getZoom()
      zoom = zoom + 1;
      if (zoom > 16) {
          return
      }
      map.setZoom(zoom);
    },
    zoomDown(map) {
      let zoom = map.getZoom()
      zoom = zoom - 1;
      if (zoom < 8) {
          return
      }
      map.setZoom(zoom);
      // this.$emit("change", this.progres01._index);
    }
  }
}