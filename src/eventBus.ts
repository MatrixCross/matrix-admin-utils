// @ts-nocheck
// infobusMixin暂时想不到如何做类型推导

// 这里的eventbus只适合vue2

import Vue, { type VueConstructor } from 'vue'
type VueConstructorParam = ConstructorParameters<VueConstructor>

const newVue = (config: VueConstructorParam) => new Vue(config)

const infobusMixin = (config: VueConstructorParam): object => {
  return {
    provide() {
      return {
        infobus: this.infobus,
      }
    },
    data() {
      return {
        infobus: newVue(config),
      }
    },
    beforeDestroy() {
      this.infobus.$destroy()
      this.infobus = null
    },
  }
}

export default {
  infobusMixin,
}
