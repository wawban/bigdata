import Vue from 'vue'
import App from './App'
import router from './router'
import "@/util/style/base.css";
import "@/util/style/global.less";
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)

import ViewUI from 'view-design';
import iViewPro from '../static/iview-pro/iview-pro.min.js';
import 'view-design/dist/styles/iview.css';
import '../static/iview-pro/iview-pro.css';
Vue.use(ViewUI);
Vue.use(iViewPro)



import Border from '@/pages/component/border'
Vue.component('Border', Border)



const echarts = require('echarts')
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
