<template>
  <div id="app">
    <div id="mapId"></div>
    <div class="panel-wrap">
      <button id="PanToGZ">Move to Guangzhou</button>
      <button id="PanToSZ">Move back to ShenZhen</button>
      <button id="AddOverlay">Add overlay</button>
      <button id="RemoveOverlay">Remove overlay</button>
    </div>
    <div class="panel-wrap" style="margin-top:200px">
      <button @click="redHotPoint">redHotPoint</button>
      <button @click="migarate">migarate</button>
    </div>
    <div id="overlay" style="display:none">hello world!</div>
  </div>
</template>

<script>
import { redHotPoint, migarate } from "./MapvDemo"
import MyOlDemo from './OlDemo'

const SZCenter = [114.0579, 22.5431];

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
    center: SZCenter, // 视图的初始中心 中心的坐标系由projection选项指定
    zoom: 10 // 缩放级别 用于计算视图的初始分辨率
  });
  window.map = new ol.Map({
    target: "mapId",
    layers: window.layers,
    view: window.view
  });
}

function initBDMap() {
  window.map = new BMap.Map("mapId", {
    enableMapClick: false
  }); // 创建Map实例
  map.centerAndZoom(new BMap.Point(108.154518, 36.643346), 5); // 初始化地图,设置中心点坐标和地图级别
  map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
}

export default {
  methods: {
    redHotPoint: redHotPoint,
    migarate: migarate
  },
  mounted() {
    // initBDMap();
    initOlMap();
    MyOlDemo.init()
    
  }
};
</script>

<style lang="css">
@import "/map.css";
</style>