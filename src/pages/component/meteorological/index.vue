<template>
  <div class="meteorological">
    <div>
      <div class="qi1">
        <div class="tqimg"><img src="./img/wd.png" alt="" /></div>
        <div class="texting">
          <p>温度</p>
          <!-- <h4>{{ tqis.tmp }}℃</h4> -->
          <h4>{{ tqis.forecasts[0].low + "~" + tqis.forecasts[0].high }}℃</h4>
        </div>
      </div>
      <div class="qi2">
        <div class="tqimg">
          <img src="./img/tq.png" alt="" />
          <div v-if="tqis.now.text == '暴雨'">
            <img src="./img/by.png" alt="" />
          </div>
          <div v-if="tqis.now.text == '冰雹'">
            <img src="./img/bb.png" alt="" />
          </div>
          <div v-if="tqis.now.text == '大雪'">
            <img src="./img/dx.png" alt="" />
          </div>
          <div v-if="tqis.now.text == '大雨'">
            <img src="./img/dy.png" alt="" />
          </div>
          <div v-if="tqis.now.text == '多云'">
            <img src="./img/dy1.png" alt="" />
          </div>
          <div v-if="tqis.now.text == '雷阵雨'">
            <img src="./img/lzy.png" alt="" />
          </div>
          <div v-if="tqis.now.text == '晴'">
            <img src="./img/q.png" alt="" />
          </div>
          <div v-if="tqis.now.text == '晴转多云'">
            <img src="./img/qzdy.png" alt="" />
          </div>
          <div v-if="tqis.now.text == '雾'">
            <img src="./img/w.png" alt="" />
          </div>
          <div v-if="tqis.now.text == '小雪'">
            <img src="./img/xx.png" alt="" />
          </div>
          <div v-if="tqis.now.text == '小雨'">
            <img src="./img/xy.png" alt="" />
          </div>
          <div v-if="tqis.now.text == '阴'">
            <img src="./img/y.png" alt="" />
          </div>
          <div v-if="tqis.now.text == '雨'">
            <img src="./img/y1.png" alt="" />
          </div>
          <div v-if="tqis.now.text == '雨夹雪'">
            <img src="./img/yjx.png" alt="" />
          </div>
          <div v-if="tqis.now.text == '中雪'">
            <img src="./img/zx.png" alt="" />
          </div>
          <div v-if="tqis.now.text == '中雨'">
            <img src="./img/zy.png" alt="" />
          </div>
        </div>
        <div class="texting">
          <p>天气</p>
          <h4>{{ tqis.now.text }}</h4>
        </div>
      </div>
    </div>
    <div class="meteorological_bott">
      <div class="qi3">
        <div class="tqimg"><img src="./img/fs.png" alt="" /></div>
        <div class="texting">
          <p>风速</p>
          <h4>{{ tqis.now.wind_class }}</h4>
        </div>
      </div>
      <div class="qi4">
        <div class="tqimg"><img src="./img/fx.png" alt="" /></div>
        <div class="texting">
          <p>风向</p>
          <h4>{{ tqis.now.wind_dir }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tqis: {
      type: Object,
      default: {},
    },
  },
  // mounted() {
  //   console.log(this.tqis);
  // },
};
</script>
<style lang="less" scoped>
.meteorological {
  padding: 0.33rem 0.25rem 0 0.25rem;
  > div {
    display: flex;
    justify-content: space-between;
    > div {
      width: 1.97rem;
      height: 0.81rem;
      background: url("./img/log2.png") no-repeat;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      .tqimg {
        padding: 0 0.2rem;
        > img {
          width: 0.61rem;
        }
      }
      .texting {
        width: 0.9rem;
        > p {
          text-align: center;
          font-size: 0.16rem;
          font-weight: 400;
          color: #96d9ff;
          line-height: 0.22rem;
        }
        > h4 {
          text-align: center;
          font-size: 0.2rem;
          color: #ffffff;
          line-height: 0.28rem;
        }
      }
    }
    .qi2 {
      > div {
        position: relative;
        > div {
          position: absolute;
          top: 0.14rem;
          left: 0.32rem;
          width: 0.32rem;
          height: 0.32rem;
          > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .meteorological_bott {
    margin-top: 0.2rem;
  }
}
</style>
