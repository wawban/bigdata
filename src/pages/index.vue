<template>
  <div class="dig">
    <div class="header">
      <div class="box">
        <div class="text">农业物联网可视化大数据测控平台</div>
        <div class="left">
          <div class="left_top">
            <img src="./img/sb.png" alt="" />
          </div>
          <div class="bottom">
            <img src="./img/cd.png" alt="" />
            <p>主菜单</p>
          </div>
        </div>
        <div class="right">
          <dir class="right_top">{{ date }}</dir>
          <div class="right_bott">
            <div>
              <div @click="switche(1)"><img src="./img/cd4.png" alt="" /></div>
              <div><img src="./img/cd2.png" alt="" /></div>
              <div @click="switche(2)"><img src="./img/cd3.png" alt="" /></div>
              <div>
                <img src="./img/cd1.png" @click="clickFullscreen" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="minte">
      <div>
        <div class="min_left">
          <div>
            <Border name="当前项目介绍">
              <Introduce :text="jgdata.jgjs" />
            </Border>
          </div>
          <div class="m_t15">
            <Border name="当前项目设备统计">
              <Statistical />
            </Border>
          </div>
          <div class="m_t15">
            <Border name="当前项目视频展示">
              <div class="spvideo">
                <video :src="jgdata.jgjssplj" controls loop></video>
              </div>
            </Border>
          </div>
        </div>
        <div class="min_center">
          <div>
            <Border :h="5.62" :name="'设备分布  （' + ajgouxxi.jgmc + '）'">
              <Map ref="mapref" :arrdata="sbdata" @wcdrawer="wcdrawer" />
            </Border>
          </div>
          <div class="m_t15">
            <Border
              name="数据记录曲线走势图"
              :flg="true"
              :arrst="dqsj.xh"
              @czsd="czsd"
            >
              <Trend ref="trends" :dqsj="dqsj" />
            </Border>
          </div>
        </div>
        <div class="min_right">
          <div>
            <Border name="实时数据">
              <RealTime :sjubande="sjubande" :sbbhs="sbbhs" />
            </Border>
          </div>
          <div class="m_t15">
            <Border name="气象实况">
              <Meteorological :tqis="tqi" />
            </Border>
          </div>
          <div class="m_t15">
            <Border name="行业信息咨询">
              <Consultation />
            </Border>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import screenfull from "screenfull";
import { listbyuser, orgsby, getorgpowers, extapiheweather } from "@/api";
import { test } from "@/util/datacs.js";
export default {
  components: {
    Introduce: () => import("./component/introduce"),
    Statistical: () => import("./component/statistical"),
    Map: () => import("./component/map"),
    Trend: () => import("./component/trend"),
    RealTime: () => import("./component/realTime"),
    Meteorological: () => import("./component/meteorological"),
    Consultation: () => import("./component/consultation"),
  },
  data() {
    return {
      ajgouxxi: {},
      sbbhs: "",
      dateLoop: null,
      date: "",
      sbdata: [],
      dqsj: {},
      sjubande: [],
      jgdata: {},
      tqi: {},
    };
  },
  created() {
    this.showtime();
    this.v1users();
    this.orgsby();
  },
  mounted() {
    getorgpowers(sessionStorage.getItem("dqjg")).then((res) => {
      this.ajgouxxi = res.data;
    });
  },
  methods: {
    clickFullscreen() {
      screenfull.toggle();
    },
    switche(e) {
      this.$refs.mapref.swch(e);
    },
    orgsby() {
      orgsby(sessionStorage.getItem("dqjg")).then((res) => {
        this.jgdata = res.data;
        var a = Object.keys(test).map((req) => {
          return test[req];
        });
        var num = a.indexOf(this.jgdata.ssxq);
        if (num == -1) {
          return this.$message({
            message: "天气获取失败，未找到该地区",
            type: "error",
          });
        } else {
          var b = Object.keys(test).map((req) => {
            return req;
          });
          var _this = this;
          // alert(b[num]);
          extapiheweather(b[num])
            .then((ret) => {
              _this.$nextTick(() => {
                console.log(ret);
                _this.tqi = ret.result || {};
              });
            })
            .catch((ree) => {
              _this.$message({ message: "天气请求失败", type: "ree" });
            });
          // -----------------------------------------------------------------------------------------------------------------
          // https://free-api.heweather.net/s6/weather/now?location=500107&key=db86a5196f304e52a4369818c5182e60
          // axios
          //   .get(
          //     "https://free-api.heweather.net/s6/weather/now?location=" +
          //       b[num] +
          //       "&key=db86a5196f304e52a4369818c5182e60"
          //   )
          //   .then((ret) => {
          //     _this.$nextTick(() => {
          //       _this.tqi = ret.data.HeWeather6[0].now || {};
          //     });
          //   });
          //   .catch((ree) => {
          //     _this.$message({ message: "天气请求失败", type: "ree" });
          //   });
          // ---------------------------------
          // /v1/?district_id=222405&data_type=all&ak=hrfs6LFUr61YMDcD7u3qGitUSRffWxyF
          // axios
          //   .get(
          //     "https://api.map.baidu.com/weather/v1/?district_id=222405&data_type=all&ak=hrfs6LFUr61YMDcD7u3qGitUSRffWxyF"
          //   )
          //   .then((ret) => {
          //     _this.$nextTick(() => {
          //       _this.tqi = ret.data.HeWeather6[0].now || {};
          //     });
          //   });
        }
      });
    },
    czsd(e) {
      this.$refs.trends.sdassfc(e);
    },
    wcdrawer(e) {
      this.sbbhs = e.sbbh;
      this.sjubande = [];
      var a = e.sjxmms.split(",");
      var b = a.map((item) => {
        return item.split(":");
      });
      var c = b.map((req) => {
        return req[0];
      });
      var d = e.xssjxm.split(",");
      var sju = d.map((zs) => {
        var i = c.indexOf(zs);
        if (i != -1) {
          return { dm: b[i][0], name: b[i][1] };
        }
      });
      this.sjubande = sju.filter((rewq) => {
        return rewq;
      });
      this.dqsj = {
        xh: sju.filter((rewq) => {
          return rewq;
        }),
        dqob: e,
      };
    },
    v1users() {
      listbyuser({
        size: 999,
        jgdm: sessionStorage.getItem("dqjg"),
        yhbh: sessionStorage.getItem("yhbhsj"),
      }).then((res) => {
        this.sbdata = res.data;
      });
    },
    showtime: function () {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var seconds = date.getSeconds();
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      if (hours < 10) {
        hours = "0" + hours;
      }
      this.date =
        year +
        "." +
        month +
        "." +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds;
      try {
        this.dateLoop = setTimeout(() => this.showtime(), 1000);
      } catch (error) {}
    },
  },
};
</script>
<style lang="less" scoped>
.dig {
  min-height: 100%;
  background: url("./img/bk.png") no-repeat;
  background-size: cover;
  background-position: center center;
  .header {
    .box {
      height: 1.22rem;
      background: url("./img/hd.png") no-repeat;
      background-size: 100% 100%;
      position: relative;
      .text {
        font-size: 0.36rem;
        color: #ffffff;
        padding-top: 0.19rem;
        text-align: center;
      }
      .left {
        position: absolute;
        left: 0.28rem;
        top: 0.21rem;
        .left_top {
          height: 0.19rem;
          > img {
            height: 100%;
          }
        }
        .bottom {
          margin-top: 0.21rem;
          width: 1.18rem;
          height: 0.38rem;
          background: url("./img/top1.png") no-repeat;
          background-size: 100% 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          > img {
            width: 0.13rem;
            height: 0.13rem;
            margin-right: 0.1rem;
          }
          > p {
            font-size: 0.14rem;
            color: #ffffff;
          }
        }
      }
      .right {
        position: absolute;
        right: 0.25rem;
        top: 0.26rem;
        .right_top {
          line-height: 0.26rem;
          font-size: 0.18rem;
          font-weight: bold;
          color: #ffffff;
          margin: 0;
        }
        .right_bott {
          margin-top: 0.08rem;
          display: flex;
          justify-content: right;
          > div {
            width: 1.38rem;
            height: 0.38rem;
            background: url("./img/top1.png") no-repeat;
            background-size: 100% 100%;
            display: flex;
            align-items: center;
            > div {
              width: 25%;
              text-align: center;
              > img {
                width: 0.16rem;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
  //
  .minte {
    padding: 0 0.28rem 0 0.26rem;
    > div {
      display: flex;
      justify-content: space-between;
      .min_left {
        width: 4.69rem;
      }
      .min_center {
        width: 8.88rem;
      }
      .min_right {
        width: 4.69rem;
      }
    }
  }
  .spvideo {
    width: 100%;
    height: 100%;
    padding: 0.11rem 0.14rem 0.15rem 0.13rem;
    > video {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

