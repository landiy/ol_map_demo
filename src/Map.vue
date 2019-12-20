<template>
  <div id="app">
    <div id="mapId"></div>
    <OpenlayersDisp />
    <MapvDisp />
    <OverlayBox />
  </div>
</template>

<script>
import OpenlayersDisp from "./components/OpenlayersDisp";
import MapvDisp from "./components/MapvDisp";
import OverlayBox from "./components/OverlayBox";

function initOlMap() {
  window.layers = [
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        url:
          "http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0"
      })
    })
  ];
  window.view = new ol.View({
    projection: "EPSG:4326", // 投影
    center: [122.8094597,-6.4353102], // 视图的初始中心 中心的坐标系由projection选项指定
    zoom: 6, // 缩放级别 用于计算视图的初始分辨率
    units: "degrees"
  });
  window.map = new ol.Map({
    target: "mapId",
    layers: window.layers,
    view: window.view
  });
}

// function initBDMap() {
//   window.map = new BMap.Map("mapId", {
//     enableMapClick: false
//   }); // 创建Map实例
//   map.centerAndZoom(new BMap.Point(114.05125828214045, 22.38978286895029), 14); // 初始化地图,设置中心点坐标和地图级别
//   map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
// }

const useMap = "OL";

export default {
  components: { OpenlayersDisp, MapvDisp, OverlayBox },
  mounted() {
    if (useMap === "BD") {
      initBDMap();
    } else {
      initOlMap();
    }
  }
};
</script>

<style lang="css">
@import "./map.css";
</style>