<template>
  <div class="sidebar" ref="sidebarRef">
    <slot>Sidebar</slot>
  </div>
</template>
<script>
import { onClickOutside } from '@vueuse/core'
import { hideMobile } from '../../mixins/hideMobile'
import { ref, onMounted, getCurrentInstance } from 'vue'

export default {
  name: 'sidebar',
  mixins: [ hideMobile ],
  setup() {
    const sidebarRef = ref(null)
    const instance = getCurrentInstance()

    onMounted(() => {
      // Use @vueuse/core for click outside functionality
      onClickOutside(sidebarRef, () => {
        // Call hideMobile when clicking outside
        if (instance && typeof instance.proxy.hideMobile === 'function') {
          instance.proxy.hideMobile()
        }
      })
    })

    return {
      sidebarRef
    }
  },
  props: {
    fixed: {
      type: Boolean,
      default: false
    }
  },
  mounted: function () {
    this.isFixed()
  },
  methods: {
    isFixed () {
      this.fixed ? document.body.classList.add('sidebar-fixed') : document.body.classList.remove('sidebar-fixed')
      return this.fixed
    }
  }
}
</script>
