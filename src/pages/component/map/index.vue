<template>
  <div class="map">
    <div class="map_left">
      <Select class="mapselect" v-model="model" style="width: 2.67rem">
        <Option
          v-for="(item, index) in arrdata"
          :value="item.sbbh"
          :key="index"
          >{{ item.sbmc }}</Option
        >
      </Select>
    </div>
    <div class="map_right">
      <Button @click="goto">视频监控入口</Button>
    </div>
    <div id="bdmap" style="width: 100%; height: 100%"></div>
  </div>
</template>
<script>
import { getorgpowers } from "@/api";
export default {
  props: {
    arrdata: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      model: "",
      mapbox: null,
      dqob: {},
      //   ards:this.arrdata
    };
  },
  watch: {
    model: {
      handler() {
        this.handleGetWidth();
      },
      deep: true,
    },
  },
  mounted() {
    this.initmap();
  },
  methods: {
    swch(e) {
      if (this.arrdata.length == 0) {
        return this.$message({
          message: "暂无设备信息",
          type: "error",
        });
      }
      var a = this.arrdata.length;
      var arr = this.arrdata.map((res) => {
        return res.sbbh;
      });
      var b = arr.indexOf(this.model);
      if (e == 2) {
        if (b + 1 == a) {
          this.model = this.arrdata[0].sbbh;
        } else {
          this.model = this.arrdata[b + 1].sbbh;
        }
      } else {
        if (b == 0) {
          this.model = this.arrdata[a - 1].sbbh;
        } else {
          this.model = this.arrdata[b - 1].sbbh;
        }
      }
    },
    goto() {
      // -------------------------------------------------------------
      getorgpowers(sessionStorage.getItem("dqjg")).then((res) => {
        if (res.data.jksblx == 1) {
          var url = this.$router.resolve({
            path: "/preview",
          });
          window.open(url.href, "_blank");
        } else {
          var xy = window.location.protocol; //获取协议
          var zj = window.location.host; //获取主机
          var baseUrl = xy + "//" + zj; // 完整地址
          // alert("大华");
          window.open(
            // ---------------------------------------------------------
            baseUrl +
              "/aiotsmdh/?tk=" +
              // ---------------------------------------------------
              // 192.168.0.108:8082
              // "http://192.168.0.108:8082/?tk=" +
              // "http://129.28.151.167:8888/aiotsmd/?tk=" +
              // ----------------------------------------------------------------
              sessionStorage.getItem("tokensj") +
              "&jg=" +
              sessionStorage.getItem("dqjg") +
              "&hb=" +
              sessionStorage.getItem("yhbhsj") +
              "&dqtk=" +
              sessionStorage.getItem("newtoken") +
              "&id=1",
            "_blank"
          );
        }
      });
    },
    cssha() {
      if (this.arrdata && this.arrdata.length != 0) {
        this.model = this.arrdata[0].sbbh;
      } else {
        setTimeout(() => {
          this.cssha();
        }, 1000);
      }
    },
    handleGetWidth() {
      var a = this.arrdata.map((res) => {
        return res.sbbh;
      });
      this.dqob = this.arrdata[a.indexOf(this.model)];
      this.$emit("wcdrawer", this.dqob);
      var img = require("./bjlog.png");
      this.mapbox.clearOverlays(); //删除所有点
      var myIcon = new BMapGL.Icon(img, new BMapGL.Size(50, 50));
      //   for (var i = 0; i < this.selectedData.length; i++) {
      //     var ebg = this.selectedData[i];
      // -------------------------------------------------------------------------------
      // var ebg = this.selectedData[i]; //vvs
      // alert(2);
      var ggPoint = new BMapGL.Point(this.dqob.jdzb, this.dqob.wdzb); //vvs
      var convertor = new BMapGL.Convertor(); //vvs
      var pointArr = []; //vvs
      pointArr.push(ggPoint); //vvs
      // var as = i; //vvs
      var _this = this; //vvs
      // alert(pointArr);
      convertor.translate(pointArr, 1, 5, (retw) => {
        // alert(1);
        // return;
        var w = retw.points[0].lat; //vvs
        var j = retw.points[0].lng; //vvs
        // =================
        var opts = {
          position: new BMapGL.Point(j, w), // 指定文本标注所在的地理位置
          offset: new BMapGL.Size(-20, -51), // 设置文本偏移量
        };
        var label = new BMapGL.Label(_this.dqob.sbmc, opts); // 创建文本标注对象
        label.setStyle({
          border: "2px solid #000",
          color: "#000",
          borderRadius: "5px",
          padding: "4px",
        });
        var marker = new BMapGL.Marker(new BMapGL.Point(j, w), {
          icon: myIcon,
        });
        _this.mapbox.addOverlay(marker); //添加地图标记
        _this.mapbox.addOverlay(label); //添加地图文字
        // var _this = this;
        //     marker.addEventListener("click", function () {
        //       _this.dqdata = ebg;
        //       _this.getdeviceslatest(ebg.sbbh);
        //     });
        //     if (i == this.selectedData.length - 1) {
        // _this.mapbox.centerAndZoom(new BMapGL.Point(j, w), 15);
        _this.mapbox.centerAndZoom(new BMapGL.Point(j, w));
        // ==================
      });
      //vvs

      //     var opts = {
      //       position: new BMapGL.Point(this.dqob.jdzb, this.dqob.wdzb), // 指定文本标注所在的地理位置
      //       offset: new BMapGL.Size(-20, -51), // 设置文本偏移量
      //     };
      //     var label = new BMapGL.Label(this.dqob.sbmc, opts); // 创建文本标注对象
      //     label.setStyle({
      //       border: "2px solid #000",
      //       color: "#000",
      //       borderRadius: "5px",
      //       padding: "4px",
      //     });
      //     var marker = new BMapGL.Marker(new BMapGL.Point(this.dqob.jdzb, this.dqob.wdzb), {
      //       icon: myIcon,
      //     });
      //     this.mapbox.addOverlay(marker); //添加地图标记
      //     this.mapbox.addOverlay(label); //添加地图文字
      //     // var _this = this;
      // //     marker.addEventListener("click", function () {
      // //       _this.dqdata = ebg;
      // //       _this.getdeviceslatest(ebg.sbbh);
      // //     });
      // //     if (i == this.selectedData.length - 1) {
      //       this.mapbox.centerAndZoom(new BMapGL.Point(this.dqob.jdzb, this.dqob.wdzb), 15);
      // //     }
      // //   }
    },
    //
    initmap() {
      this.mapbox = new BMapGL.Map("bdmap");
      this.mapbox.centerAndZoom(new BMapGL.Point(), 15);
      // this.mapbox.setMapType(BMAP_EARTH_MAP);
      this.mapbox.enableScrollWheelZoom(true);
      this.cssha();
      this.mapbox.setMapStyleV2({
        styleId: "b9cc3b0cf16de00ab3becb713bcab0d7",
      });
    },
  },
};
</script>
<style lang="less">
.map {
  padding: 0.1rem 0.09rem 0.09rem 0.1rem;
  width: 100%;
  height: 100%;
  position: relative;
  .map_left {
    position: absolute;
    top: 0.16rem;
    left: 0.17rem;
    // background: red;
    z-index: 999;
    // line-height: ;
    .mapselect {
      color: #fff;
      .ivu-select-selection {
        background: #182d3781;
        border: none;
      }
      .ivu-select-dropdown {
        background: #182d3781;
        min-width: 2.67rem;
        width: inherit;
        max-height: 5rem;
      }

      .ivu-select-item-selected {
        background: #182d3781;
      }
      .ivu-select-item {
        color: #fff;
      }
      .ivu-select-item:hover {
        background: #182d3781;
      }
      //  ivu-select-item-focus

      .ivu-select-dropdown::-webkit-scrollbar {
        /*滚动条整体样式*/
        // width : 10px;
        /*高宽分别对应横竖滚动条的尺寸*/
        width: 0.06rem;
      }

      .ivu-select-dropdown::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 0.1rem;
        background: #7e929b;
      }
    }
  }
  .map_right {
    position: absolute;
    top: 0.16rem;
    right: 0.17rem;
    z-index: 999;
    > Button {
      background: #182d3781;
      color: #fff;
      border: none;
    }
  }
}

.anchorBL {
  display: none !important;
}
</style>