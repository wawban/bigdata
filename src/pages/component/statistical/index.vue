<template>
  <div class="statistical">
    <div ref="statistical" class="histogram-charts"></div>
  </div>
</template>
<script>
import { dashboarddevice } from "@/api";
export default {
  props: {},
  data() {
    return {
      //   myChart: null,
      datat: [],
    };
  },
  mounted() {
    this.dashboarddevice();
  },
  methods: {
    dashboarddevice() {
      dashboarddevice({
        sblx: "",
        jgdm: sessionStorage.getItem("dqjg"),
        yhbh: sessionStorage.getItem("yhbhsj"),
      }).then((res) => {
        // console.log(res)
        var a = res.data;
        var i = ((a.zxsbs || 0) / (a.sbs || 0)) * 100;
        // this.datat = [a.sbs||0,a.zxsbs||0,a.lxsbs||0,a.gzjls||0,i]
        this.datat = [a.sbs || 0, a.zxsbs || 0, a.lxsbs || 0, i || 0];
        this.createCharts();
      });
    },
    createCharts: function (dataList) {
      const _this = this;
      var asn = _this.datat[3].toFixed(1);

      var textname = "设备在线率 " + asn;
      // alert(textname);
      // var uy = "设备在线率100";
      this.myChart = this.$echarts.init(this.$refs.statistical);
      var option = {
        grid: {
          left: "10%",
          right: "4%",
          top: "10%",
          bottom: "12%",
        },
        xAxis: [
          {
            type: "category",
            // data: ["设备总数", "在线数", "离线数", "工作记录数", "设备在线率"],
            data: ["设备总数", "在线数", "离线数", textname],
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
            axisLabel: {
              interval: 0,
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
            data: _this.datat,
            type: "bar",
            barWidth: 15,
            itemStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "#57EEFF",
                    },
                    {
                      offset: 1,
                      color: "#042238", // 100% 处的颜色
                    },
                  ],
                },
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