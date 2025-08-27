<template>
  <div
    ref="container"
    class="ps-wrapper"
    @scroll="onScroll"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'VuePerfectScrollbar',
  props: {
    // Accept settings for compatibility; not used in this lightweight shim
    settings: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['ps-scroll-y'],
  methods: {
    onScroll(evt) {
      // Emit the same event name expected by callers
      this.$emit('ps-scroll-y', evt)
    }
  }
}
</script>

<style scoped>
.ps-wrapper {
  overflow-y: auto;
  overflow-x: hidden;
  max-height: 100%;
}
</style>

