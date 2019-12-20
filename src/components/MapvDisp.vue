<template>
  <div class="panel-wrap" style="margin-top:200px">
    <button @click="redHotPoint">redHotPoint</button>
    <button @click="migarate">migarate</button>
    <button @click="honeyHeat">honeyHeat</button>
    <button @click="test">test</button>
    <button @click="clearAllLayers">CLEAR LAYERS</button>
    <input type="file" ref="upload" class="outputlist_upload" />
  </div>
</template>

<script>
const SHCenter = [121.4737, 31.2304];
const SZCenter = [114.0579, 22.5431];
const GZCenter = [113.2644, 23.1291];
const _win = window;
let dataList = [];
let layersList = []

export default {
  methods: {
    clearAllLayers(){
      layersList.forEach((mapvLayer)=>{
        mapvLayer.destroy()
      })
    },

    readExcel(e) {
      //表格导入
      var that = this;
      const files = e.target.files;
      console.log(files);
      if (files.length <= 0) {
        //如果没有文件名
        return false;
      }
      const fileReader = new FileReader();
      fileReader.onload = ev => {
        const data = ev.target.result;
        dataList = data.split("\n").map(item => {
          const arr = item.split(",");
          return [arr[4], arr[5]];
        });
      };
      fileReader.readAsBinaryString(files[0]);
    },

    redHotPoint() {
      // get data
      var data = [];
      // 构造数据
      data = dataList.map(item => {
        return {
          geometry: {
            type: "Point",
            coordinates: [item[0], item[1]]
          },
          count: 100
        };
      });
      var dataSet = new mapv.DataSet(data);
      var options = {
        size: 2,
        max: 100,
        draw: "heatmap",
        gradient: {
          0.25: "rgba(0,0,255,1)",
          0.55: "rgba(0,0,255,0.7)",
          0.85: "rgba(0,0,255,0.5)",
          1.0: "rgba(0,0,255,0.3)"
        },
        width: 50,
        height: 50
      };
      const layer = new mapv.OpenlayersLayer(
        window.map,
        dataSet,
        options
      );
      layersList.push(layer)
    },

    honeyHeat() {
      var randomCount = 300;
      var data = [];
      var citys = [
        "北京",
        "天津",
        "上海",
        "重庆",
        "石家庄",
        "太原",
        "呼和浩特",
        "哈尔滨",
        "长春",
        "沈阳",
        "济南",
        "南京",
        "合肥",
        "杭州",
        "南昌",
        "福州",
        "郑州",
        "武汉",
        "长沙",
        "广州",
        "南宁",
        "西安",
        "银川",
        "兰州",
        "西宁",
        "乌鲁木齐",
        "成都",
        "贵阳",
        "昆明",
        "拉萨",
        "海口"
      ];
      // 构造数据
      while (randomCount--) {
        var cityCenter = mapv.utilCityCenter.getCenterByCityName(
          citys[parseInt(Math.random() * citys.length)]
        );
        data.push({
          geometry: {
            type: "Point",
            coordinates: [
              cityCenter.lng - 2 + Math.random() * 4,
              cityCenter.lat - 2 + Math.random() * 4
            ]
          },
          count: 30 * Math.random()
        });
      }

      var dataSet = new mapv.DataSet(data);

      var options = {
        fillStyle: "rgba(55, 50, 250, 0.8)",
        shadowColor: "rgba(255, 250, 50, 1)",
        shadowBlur: 20,
        max: 100,
        size: 50,
        label: {
          show: true,
          fillStyle: "white"
          // shadowColor: 'yellow',
          // font: '20px Arial',
          // shadowBlur: 10,
        },
        globalAlpha: 0.5,
        gradient: {
          0.25: "rgb(0,0,255)",
          0.55: "rgb(0,255,0)",
          0.85: "yellow",
          1.0: "rgb(255,0,0)"
        },
        draw: "honeycomb"
      };

      var honeyMapvLayer = new mapv.OpenlayersLayer(_win.map, dataSet, options);
    },

    migarate() {
      var randomCount = 500;

      var node_data = {
        "0": { x: 108.154518, y: 36.643346 },
        "1": { x: 121.485124, y: 31.235317 }
      };

      var edge_data = [{ source: "1", target: "0" }];

      var citys = [
        "北京",
        "天津",
        "上海",
        "重庆",
        "石家庄",
        "太原",
        "呼和浩特",
        "哈尔滨",
        "长春",
        "沈阳",
        "济南",
        "南京",
        "合肥",
        "杭州",
        "南昌",
        "福州",
        "郑州",
        "武汉",
        "长沙",
        "广州",
        "南宁",
        "西安",
        "银川",
        "兰州",
        "西宁",
        "乌鲁木齐",
        "成都",
        "贵阳",
        "昆明",
        "拉萨",
        "海口"
      ];

      // 构造数据
      for (var i = 1; i < randomCount; i++) {
        var cityCenter = mapv.utilCityCenter.getCenterByCityName(
          citys[parseInt(Math.random() * citys.length)]
        );
        node_data[i] = {
          x: cityCenter.lng - 5 + Math.random() * 10,
          y: cityCenter.lat - 5 + Math.random() * 10
        };
        edge_data.push({ source: ~~(i * Math.random()), target: "0" });
      }

      var fbundling = mapv
        .utilForceEdgeBundling()
        .nodes(node_data)
        .edges(edge_data);

      var results = fbundling();

      var data = [];
      var timeData = [];

      for (var i = 0; i < results.length; i++) {
        var line = results[i];
        var coordinates = [];
        for (var j = 0; j < line.length; j++) {
          coordinates.push([line[j].x, line[j].y]);
          timeData.push({
            geometry: {
              type: "Point",
              coordinates: [line[j].x, line[j].y]
            },
            count: 1,
            time: j
          });
        }
        data.push({
          geometry: {
            type: "LineString",
            coordinates: coordinates
          }
        });
      }

      var dataSet = new mapv.DataSet(data);

      var options = {
        strokeStyle: "rgba(55, 50, 250, 0.3)",
        globalCompositeOperation: "lighter",
        shadowColor: "rgba(55, 50, 250, 0.5)",
        shadowBlur: 10,
        methods: {
          click: function(item) {}
        },
        lineWidth: 1.0,
        draw: "simple"
      };

      var blueLine = new mapv.OpenlayersLayer(_win.map, dataSet, options);

      var dataSet = new mapv.DataSet(timeData);

      var options = {
        fillStyle: "rgba(255, 250, 250, 0.9)",
        globalCompositeOperation: "lighter",
        size: 1.5,
        // animation: {
        //   type: 'time',
        //   stepsRange: {
        //     start: 0,
        //     end: 100
        //   },
        //   trails: 1,
        //   duration: 5,
        // },
        draw: "simple"
      };

      var lightLine = new mapv.OpenlayersLayer(_win.map, dataSet, options);
    },

    test() {
      var randomCount = 300;
      var data = [];
      var mapvLayer = {};
      while (randomCount--) {
        data.push({
          geometry: {
            type: "Point",
            coordinates: [
              -125.8 + Math.random() * 50,
              30.3 + Math.random() * 20
            ]
          },
          count: 30 * Math.random()
        });
      }

      var dataSet = new mapv.DataSet(data);

      var options = {
        fillStyle: "#fa8b2e", // 填充颜色
        strokeStyle: "#fff", // 边框颜色
        label: {
          // 是否显示文字标签
          show: true
        },
        draw: "cluster",
        projection: "EPSG:4326",
        methods: {
          click: function(event) {
            console.log(event);
          },
          mousemove: function(event) {
            if (event) {
              pointMapvLayer.setDefaultCursor("pointer", event);
            } else {
              pointMapvLayer.setDefaultCursor("default", event);
            }
          }
        }
      };

      _win.pointMapvLayer = new mapv.OpenlayersLayer(map, dataSet, options);
    }
  },
  mounted() {
    this.$refs.upload.addEventListener("change", e => {
      //绑定监听表格导入事件
      this.readExcel(e);
    });
  }
};
</script>
