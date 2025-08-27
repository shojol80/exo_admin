<template>
  <b-modal
      v-bind="$attrs"
      v-on="$listeners"
      :modal-class="`modal-${variant} modal-min-btn ${modalClass}`"
      :title="title"
      :hide-header-close="hideHeaderClose"
      centered
      :cancel-title="cancelTitle"
      cancel-variant="light"
      :ok-title="okTitle"
      :ok-variant="variant"
      ref="modal">
    <slot v-for="(_, name) in $slots" :name="name" :slot="name"/>
    <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
      <slot :name="name" v-bind="slotData"/>
    </template>
  </b-modal>
</template>
<script>
export default {
  name: 'DialogModal',
  props: {
    cancelTitle: {default: 'CANCEL'},
    okTitle: {default: 'OK'},
    title: {default: 'Exolog'},
    variant: {default: 'primary'},
    hideHeaderClose: {default: true},
    modalClass: {default: ''},
  },
  methods: {
    show(...arg) {
      this.$refs.modal.show(...arg)
    },
    hide(...arg) {
      this.$refs.modal.hide(...arg)
    }
  }
}
</script>
