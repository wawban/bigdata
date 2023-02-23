<template>
  <div class="RealTime">
    <div class="timtop">
      <div v-for="(item, index) in arrew" :key="index" v-show="index < 4">
        <div class="imgs">
          <img :src="imgs[item.dm]" alt="" />
        </div>
        <p>{{ item.name }}</p>
        <div class="footer">
          {{ aondjdh[item.dm] ? aondjdh[item.dm].toFixed(2) : 0 }}
        </div>
      </div>
    </div>
    <div class="timboot">
      <div
        v-for="(item, index) in arrew"
        :key="index"
        v-show="index < 8 && index > 3"
      >
        <div class="timname">{{ item.name }}</div>
        <div class="tims">
          <div></div>
        </div>
        <div class="timzhi">
          {{ aondjdh[item.dm] ? aondjdh[item.dm].toFixed(2) : 0 }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { deviceslatest } from "@/api";
export default {
  props: {
    sjubande: {
      type: Array,
      default: [],
    },
    sbbhs: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      aondjdh: {},
      imgs: {
        dan: require("./img/dan.png"),
        lin: require("./img/lin.png"),
        jia: require("./img/jia.png"),
        phz: require("./img/phz.png"),
        fx: require("./img/fx.png"),
        pm2d5: require("./img/pm2d5.png"),
        co2: require("./img/co2.png"),
        zs: require("./img/zs.png"),
        ecz: require("./img/ecz.png"),
        dqy: require("./img/dqy.png"),
        yl: require("./img/yl.png"),
        zfl: require("./img/zfl.png"),
        wd2: require("./img/wd2.png"),
        sd2: require("./img/sd2.png"),
        gzd: require("./img/gzd.png"),
        wd1: require("./img/wd1.png"),
        sd1: require("./img/sd1.png"),
        wd3: require("./img/wd3.png"),
        sd3: require("./img/sd3.png"),
        fs: require("./img/fs.png"),
        pm10: require("./img/pm10.png"),
        pm1d0: require("./img/pm1d0.png"),
        co: require("./img/co.png"),
      },
      arrew: [],
    };
  },
  mounted() {
    this.initse();
  },
  watch: {
    sjubande: {
      handler(e) {
        if (e) {
          this.deviceslatest();
        }
      },
      deep: true,
    },
  },
  methods: {
    deviceslatest() {
      deviceslatest({ sbbhs: this.sbbhs }).then((res) => {
        this.aondjdh = res.data[0];
        this.arrew = this.sjubande.filter((fg) => {
          return this.imgs[fg.dm];
        });
      });
    },
    initse() {
      if (this.sjubande&&this.sbbhs) {
        this.deviceslatest();
      } else {
        setTimeout(() => {
          this.initse();
        }, 1000);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.RealTime {
  padding-top: 0.11rem;
  .timtop {
    display: flex;
    align-items: center;
    > div {
      width: 1.1rem;
      padding-left: 0.24rem;
      .imgs {
        height: 0.37rem;
        background: url("./img/log.png") no-repeat;
        background-size: 100% 100%;
        position: relative;
        > img {
          width: 0.29rem;
          position: absolute;
          top: -0.08rem;
          left: 0.26rem;
        }
      }
      > p {
        text-align: center;
        font-size: 0.16rem;
        font-weight: 400;
        color: #ffffff;
        line-height: 0.22rem;
        padding: 0.07rem;
      }
      .footer {
        height: 0.27rem;
        background: url("./img/log1.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.2rem;
        color: #ffffff;
      }
    }
  }
  .timboot {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    > div {
      width: 1.98rem;
      margin-left: 0.24rem;
      height: 0.42rem;
      background: url("./img/log2.png") no-repeat;
      background-size: 100% 100%;
      margin-top: 0.11rem;
      display: flex;
      align-items: center;
      .timname {
        width: 49%;
        text-align: center;

        font-size: 0.16rem;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .timzhi {
      width: 49%;
      text-align: center;
      font-size: 0.16rem;
      font-weight: 400;
      color: #7be1ff;
    }
    .tims {
      > div {
        height: 0.2rem;
        width: 0.01rem;
        background: #3f6f9a;
      }
    }
  }
}
</style>