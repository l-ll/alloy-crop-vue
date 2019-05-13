// Import vue component
import Vue from 'vue'
import component from './alloy-crop-vue.vue'

const AlloyCropVue = (params = {}) => {
  const Constructor = Vue.extend(component)
  const instance = new Constructor({
    el: document.createElement('div'),
    propsData: params
  })
  document.body.appendChild(instance.$el)
  return new Promise(resolve => {
    instance.callBack = (options) => {
      instance.showCrop = false
      resolve(options)
    }
    instance.showCrop = true
  })
}

// install function executed by Vue.use()
function install(Vue) {
  if (install.installed) return
  install.installed = true
  Vue.component('AlloyCropVue', component)
  Vue.$crop = Vue.prototype.$crop = AlloyCropVue
}

// Create module definition for Vue.use()
const plugin = {
  install,
}

// To auto-install when vue is found
/* global window global */
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
component.install = install

// Export component by default
export default component

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo'
// export const RollupDemoDirective = component
