<template>
  <div class="introduce">
    <marquee
      ref="marquee"
      @mousemove="stop"
      @mouseout="start"
      width="100%"
      height="100%"
      direction="up"
      scrollamount="2"
    >
      <!-- {{ text }} -->
      <div class="ql-editor" v-html="text"></div>
      <!-- <div v-html="'<h1>' + text + '</h1>'"></div> -->
      <!-- <p v-html></p> -->
    </marquee>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
  },
  methods: {
    stop() {
      this.$refs.marquee.stop();
    },
    start() {
      this.$refs.marquee.start();
    },
  },
};
</script>
<style lang="less" scoped>
.introduce {
  // background: red;
  padding: 0.29rem 0.34rem 0 0.35rem;
  height: 2.3rem;
  // height: 1.92rem;
  font-size: 0.14rem;
  font-weight: 400;
  color: #ffffff;
}
</style>