<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { authtoken } from "@/api";
export default {
  name: 'App',
  mounted(){
    var url = window.location.href.split("?")[1]
    var kv = url.split("&")
    // if(!sessionStorage.getItem('newtoken')){
    //   sessionStorage.setItem("newtoken",kv[3].split("=")[1])
    // }
    sessionStorage.setItem("tokensj",kv[0].split("=")[1])
    sessionStorage.setItem("dqjg",kv[1].split("=")[1])
    sessionStorage.setItem("yhbhsj",kv[2].split("=")[1])
    this.gettoken()
  },
  methods:{
    gettoken(){
      authtoken({token:sessionStorage.getItem("tokensj"),grantType:'refresh_token',accessKeyId: "XoyNoHs1"}).then(res=>{
        sessionStorage.setItem('newtoken',res.data.accessToken)
        setTimeout(()=>{
          this.gettoken()
        },1000*60*25)
      })
    },
  }
}
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
</style>
