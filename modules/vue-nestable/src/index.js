import VueNestable from './VueNestable.vue'
import VueNestableHandle from './VueNestableHandle.vue'

// export named components
export {
  VueNestable,
  VueNestableHandle
}

// export vue component installer
export default {
  install: function (app, options) {
    app.component('VueNestable', VueNestable)
    app.component('VueNestableHandle', VueNestableHandle)
  }
}
