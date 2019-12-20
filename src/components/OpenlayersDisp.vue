<template>
  <div class="panel-wrap">
    <button id="PanToGZ">Move to Guangzhou</button>
    <button id="PanToSZ">Move back to ShenZhen</button>
    <button id="AddOverlay">Add overlay</button>
    <button id="RemoveOverlay">Remove overlay</button>
  </div>
</template>

<script>

const SHCenter = [121.4737, 31.2304]
const SZCenter = [114.0579, 22.5431]
const GZCenter = [113.2644, 23.1291]

export default {
  methods: {
    bindClick(id, cb) {
      document.getElementById(id).addEventListener("click", cb)
    },

    moveToAni(pos) {
      window.view.animate({
        center: pos
      })
    },

    addOverlay() {
      const dom = document.getElementById("overlay")
      if (!dom) return
      this.moveToAni(SZCenter)
      this.myOl = new ol.Overlay({
        element: dom,
        position: SZCenter
      })
      window.map.addOverlay(this.myOl)
      dom.style.display = "block"
    },

    removeOverlay() {
      this.myOl && window.map.removeOverlay(this.myOl) // 直接去掉overlay里的dom，非常暴力和彻底
    }
  },
  mounted() {
    this.bindClick("PanToGZ", this.moveToAni.bind(null, GZCenter))
    this.bindClick("PanToSZ", this.moveToAni.bind(null, SZCenter))
    this.bindClick("AddOverlay", this.addOverlay.bind(this))
    this.bindClick("RemoveOverlay", this.removeOverlay.bind(this))
  }
}
</script>
