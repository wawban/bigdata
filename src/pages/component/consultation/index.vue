<template>
  <div class="consultation" ref="list">
    <ul ref="list1">
      <li v-for="(i, index) in dalist" :key="index" @click="gotu(i)">
        <div>{{ i.xwbt }}</div>
      </li>
    </ul>
    <ul v-if="dalist.length >= num">
      <li v-for="(i, index) in dalist" :key="index" @click="gotu(i)">
        <div>{{ i.xwbt }}</div>
      </li>
    </ul>
  </div>
</template>
<script>
import { getnewsinfos } from "@/api";
export default {
  data() {
    return {
      // dalist:[1,2,3,4,5,6],
      dalist: [],
      num: 6,
      speed: 50,
    };
  },
  mounted() {
    // this.startScrolling();
    this.getnewsinfos();
  },
  methods: {
    gotu(e) {
      console.log(e.ljdz);
      if (!e.ljdz) {
        return this.$Message.error("未配置地址");
      }
      window.open(e.ljdz);
    },
    getnewsinfos() {
      getnewsinfos({
        current: 1,
        size: 99,
        jgdm: sessionStorage.getItem("dqjg"),
      }).then((res) => {
        this.dalist = res.data || [];
        this.startScrolling();
      });
    },
    // 数据滚动
    startScrolling: function () {
      //   const area = this.$refs[this.refId + "list"];
      const area = this.$refs["list"];
      const con1 = this.$refs["list1"];
      function scrollUp() {
        // 元素距离顶部距离
        if (area.scrollTop >= con1.offsetHeight - 1) {
          area.scrollTop = 0;
        } else {
          area.scrollTop++;
        }
      }
      this.mytimer = setInterval(scrollUp, this.speed);
      // 移入停止滚动
      const _this = this;
      area.onmouseover = function () {
        if (_this.mytimer) {
          clearInterval(_this.mytimer);
          _this.mytimer = null;
        }
      };
      // 移出继续滚动
      area.onmouseout = function () {
        _this.mytimer = setInterval(scrollUp, _this.speed);
      };
    },
  },
};
</script>
<style lang="less" scoped>
.consultation {
  padding: 0.15rem 0.15rem 0 0.15rem;
  height: 2.3rem;
  overflow: hidden;
  > ul {
    > li {
      padding-bottom: 0.04rem;
      cursor: pointer;
      > div {
        line-height: 0.37rem;
        background: url("./log.png") no-repeat;
        background-size: 100% 100%;
        margin-bottom: 0.04rem;
        padding-left: 0.44rem;
        font-size: 0.14rem;
        font-weight: 400;
        color: #ffffff;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      // line-height: .4rem;
      // background: url("./log.png") no-repeat;
      // background-size: 100% 100%;
      // margin-bottom: .04rem;
      // padding-left: .44rem;
      // font-size: .14rem;
      // font-weight: 400;
      // color: #FFFFFF;
      // overflow: hidden;
      // white-space: nowrap;
      // text-overflow: ellipsis;
    }
  }
}
</style>
