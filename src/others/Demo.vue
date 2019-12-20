<template>
  <div id="map"></div>
</template>

<script>
var projection = new ol.proj.Projection({
  code: "EPSG:4326",
  units: "degrees"
});

function getNavmapLayer() {
  return new ol.layer.Tile({
    source: new ol.source.XYZ({
      url:
        "http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i345013117!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0"
    }),
    projection: projection
  });
}
var navlayer = getNavmapLayer();
const map = new ol.Map({
  controls: ol.control.defaults({
    attribution: false
  }),
  target: "map",
  layers: [navlayer],
  view: new ol.View({
    projection: projection,
    center: [116.456, 40.251],
    zoom: 4
  })
});
var coordinate = [116.456, 40.251];

// $.get('../data/china.json', function (geojson) {

var geojsonOptions = {
  gradient: {
    0: "rgba(55, 50, 250, 0.4)",
    1: "rgba(55, 50, 250, 1)"
  },
  max: 354551,
  draw: "intensity"
};

var to = "北京";

var qianxi = new mapv.DataSet([
  {
    from: "河北",
    count: 354551,
    to: to
  },
  {
    from: "天津",
    count: 97323,
    to: to
  },
  {
    from: "山东",
    count: 28664,
    to: to
  },
  {
    from: "山西",
    count: 16650,
    to: to
  },
  {
    from: "辽宁",
    count: 14379,
    to: to
  },
  {
    from: "河南",
    count: 10980,
    to: to
  },
  {
    from: "内蒙古自治区",
    count: 9603,
    to: to
  },
  {
    from: "江苏",
    count: 4536,
    to: to
  },
  {
    from: "上海",
    count: 3556,
    to: to
  },
  {
    from: "广东",
    count: 2600,
    to: to
  }
]);

var qianxiData = qianxi.get();

var lineData = [];
var pointData = [];
var textData = [];
var timeData = [];

var citys = {};

for (var i = 0; i < qianxiData.length; i++) {
  var fromCenter = mapv.utilCityCenter.getCenterByCityName(qianxiData[i].from);
  var toCenter = mapv.utilCityCenter.getCenterByCityName(qianxiData[i].to);
  if (!fromCenter || !toCenter) {
    continue;
  }
  citys[qianxiData[i].from] = qianxiData[i].count;
  citys[qianxiData[i].to] = 100;
  pointData.push({
    geometry: {
      type: "Point",
      coordinates: [fromCenter.lng, fromCenter.lat]
    }
  });
  pointData.push({
    geometry: {
      type: "Point",
      coordinates: [toCenter.lng, toCenter.lat]
    }
  });
  textData.push({
    geometry: {
      type: "Point",
      coordinates: [fromCenter.lng, fromCenter.lat]
    },
    text: qianxiData[i].from
  });
  textData.push({
    geometry: {
      type: "Point",
      coordinates: [toCenter.lng, toCenter.lat]
    },
    text: qianxiData[i].to
  });

  var curve = mapv.utilCurve.getPoints([fromCenter, toCenter]);

  for (let j = 0; j < curve.length; j++) {
    timeData.push({
      geometry: {
        type: "Point",
        coordinates: curve[j]
      },
      count: 1,
      time: j
    });
  }

  lineData.push({
    geometry: {
      type: "LineString",
      coordinates: curve
      //coordinates: [[fromCenter.lng, fromCenter.lat], [toCenter.lng, toCenter.lat]]
    },
    count: 30 * Math.random()
  });
}

var textDataSet = new mapv.DataSet(textData);

var textOptions = {
  draw: "text",
  font: "14px Arial",
  fillStyle: "white",
  shadowColor: "yellow",
  shadowBlue: 10,
  zIndex: 11,
  shadowBlur: 10
};

var textMapvLayer = new mapv.OpenlayersLayer(map, textDataSet, textOptions);

var lineDataSet = new mapv.DataSet(lineData);

var lineOptions = {
  strokeStyle: "rgba(255, 250, 50, 0.8)",
  shadowColor: "rgba(255, 250, 50, 1)",
  shadowBlur: 20,
  lineWidth: 2,
  zIndex: 100,
  draw: "simple"
};

var lineLayer = new mapv.OpenlayersLayer(map, lineDataSet, lineOptions);

var pointOptions = {
  fillStyle: "rgba(254,175,3,0.7)",
  shadowColor: "rgba(55, 50, 250, 0.5)",
  shadowBlur: 10,
  size: 5,
  zIndex: 10,
  draw: "simple"
};

var pointDataSet = new mapv.DataSet(pointData);

var pointLayer = new mapv.OpenlayersLayer(map, pointDataSet, pointOptions);

var timeDataSet = new mapv.DataSet(timeData);

console.log(timeData);

var timeOptions = {
  fillStyle: "rgba(255, 250, 250, 0.5)",
  zIndex: 200,
  size: 2.5,
  animation: {
    type: "time",
    stepsRange: {
      start: 0,
      end: 50
    },
    trails: 10,
    duration: 2
  },
  draw: "simple"
};

var mapvLayer = new mapv.OpenlayersLayer(map, timeDataSet, timeOptions);

export default {};
</script>
<style scoped>
@import "./map.css";
</style>