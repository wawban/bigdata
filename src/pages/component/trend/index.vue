<template>
  <div class="statistical">
    <div ref="statistical" class="histogram-charts"></div>
  </div>
</template>
<script>
import { works } from "@/api";
export default {
  props: {
    dqsj: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      dajdaj: [],
      x: [],
      serd: [],
    };
  },
  watch: {
    dqsj: {
      handler(e) {
        if (this.dqsj && this.dqsj.dqob) {
          this.handleGetWidth();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    sdassfc(e) {
      this.x = this.dajdaj.map((ite) => {
        return ite.gzsj;
      });
      this.serd = this.dajdaj.map((ite) => {
        return ite[e];
      });
      this.createCharts();
    },
    handleGetWidth() {
      var a = new Date().getTime();
      var b = new Date(a - 30 * 24 * 3600 * 1000);
      works({
        current: 1,
        size: 9,
        sbbh: this.dqsj.dqob.sbbh,
        gzsj1: this.$Date(new Date(b)).format("YYYY-MM-DD HH:mm:ss"),
        gzsj2: this.$Date(new Date(a)).format("YYYY-MM-DD HH:mm:ss"),
      }).then((res) => {
        this.dajdaj = res.data;
        this.dajdaj = this.dajdaj.reverse();
        this.sdassfc(this.dqsj.xh[0].dm);
      });
    },
    createCharts: function (dataList) {
      const _this = this;
      this.myChart = this.$echarts.init(this.$refs.statistical);
      var option = {
        grid: {
          left: "6%",
          right: "2%",
          top: "10%",

          bottom: "12%",
        },
        xAxis: [
          {
            data: _this.x,
            axisTick: {
              alignWithLabel: true,
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#2983c331",
                width: 14,
              },
            },
          },
        ],
        series: [
          {
            data: _this.serd,
            type: "line",
            smooth: true,
            symbolSize: 10,
            itemStyle: {
              color: "#61D8FF",
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 1,
                    color: "rgba(255, 255, 255, 0.068)",
                  },
                  {
                    offset: 0,
                    color: "#61b0ff4f",
                  },
                ],
                global: false,
              },
            },
          },
        ],
      };
      this.myChart.setOption(option);
    },
  },
};
</script>
<style lang="less" scoped>
.statistical {
  height: inherit;
  width: inherit;
  > div {
    height: inherit;
    width: inherit;
    color: #2983c331;
  }
}
</style>