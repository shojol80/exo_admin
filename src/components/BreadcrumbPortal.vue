<template>
  <portal :disabled="disabled" :to="target">
    <template v-if="!disabled">
      <slot></slot>
    </template>
  </portal>
</template>

<script>
export default {
  name: 'BreadcrumbPortal',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {}
  },
  computed: {
    target() {
      return this.$store.getters['app/screenMode'] === 'FULLSCREEN' ? 'breadcrumbLast' : 'popupHeader'
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/vue-component";

</style>
