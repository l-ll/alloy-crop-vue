import Vue from 'vue'
import index from './index.vue'
import AlloyCropVue from '../src/entry.js'
Vue.use(AlloyCropVue)
Vue.config.productionTip = false

new Vue({
  render: h => h(index),
}).$mount('#app')
