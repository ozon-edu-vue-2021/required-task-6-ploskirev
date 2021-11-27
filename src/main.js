import Vue from 'vue'
import App from './App.vue'
import checkView from 'vue-check-view'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import VueVirtualScroller from 'vue-virtual-scroller'

Vue.use(VueVirtualScroller)
Vue.use(checkView)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
