<template>
  <div class="border">
    <div class="bdtop bdtopflag" v-if="flg">
      <p>{{ name }}</p>
      <div class="selsd">
        <Select class="mapselect" v-model="model" style="width: 1.19rem" @on-change="czsd">
          <Option
            v-for="(item, index) in arrst"
            :value="item.dm"
            :key="index"
            >{{ item.name }}</Option
          >
        </Select>
      </div>
    </div>
    <div class="bdtop" v-else>
      <p>{{ name }}</p>
    </div>
    <div class="bdbox" :style="'height:' + h + 'rem'">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    h: {
      type: Number,
      default: 2.46,
    },
    flg: {
      type: Boolean,
      default: false,
    },
    arrst: {
      type: Array,
      default: ()=>{
        return []
      },
    },
  },
  data() {
    return {
      model: "",
    };
  },
    watch: {
    arrst: {
      
      handler(e) {
        this.model=e[0].dm
      },
      deep: true,
    },
  },
  methods:{
    czsd(e){
      this.$emit('czsd',e)
    }
  }
};
</script>
<style lang="less">
.border {
  width: 100%;
  .bdtop {
    height: 0.44rem;
    background: url("../img/bder.png") no-repeat;
    background-size: 100% 100%;
    > p {
      padding: 0.05rem 0 0 0.38rem;
      color: #ffffff;
      font-size: 0.2rem;
      line-height: 0.28rem;
    }
  }

  // .bdtopflag{
  //     .selsd{
  .bdtopflag {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    .selsd {
      .mapselect {
        color: #fff;
        .ivu-select-selection {
          background: #277ebc4f;
        //   border: none;
          border: 1px solid #277DBC;
        }
        .ivu-select-dropdown {
          background: #277ebc4f;
        //   min-width: 2.67rem;
          width: inherit;
        //   max-height: 5rem;
        }

        .ivu-select-item-selected {
          background: #277ebc4f;
        }
        .ivu-select-item {
          color: #fff;
        }
        .ivu-select-item:hover {
          background: #277ebc4f;
        }





        .ivu-select-dropdown::-webkit-scrollbar {
          width: 0.06rem;
        }

        .ivu-select-dropdown::-webkit-scrollbar-thumb {
          border-radius: 0.1rem;
          background: #7e929b;
        }
      }
    }
  }
  //     }
  // }

  .bdbox {
    margin-top: 0.1rem;
    background: url("../img/bk1.png") no-repeat;
    background-size: 100% 100%;
  }
}
</style>