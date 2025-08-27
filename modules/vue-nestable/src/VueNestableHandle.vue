<template>
  <div class="nestable-handle">
    <div
      draggable
      class="nestable-handle__handle"
      @dragstart="dragstart"
      @touchstart="dragstart"
      @touchend="touchend"
      @touchmove="touchmove">
      <slot name="default"></slot>
    </div>
    <div class="nestable-handle-collapse">
      <slot name="collapse"
            :collapse="collapse"
            :collapsed="collapsed"
            :hasChildren="hasChildren">
      </slot>
    </div>
    <div class="nestable-handle-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script type="text/babel">
  import groupsObserver from './groups-observer.js'

  export default {
    name: 'VueNestableHandle',

    mixins: [groupsObserver],

    props: {
      item: {
        type: Object,
        required: false,
        default: () => ({})
      },
      collapse: {
        type: Function
      },
      collapsed: {
        type: Boolean,
        default: false
      },
    },

    inject: ['group', 'onDragEnd', 'childrenProp'],

    computed:{
      hasChildren() {
        return this.item[this.childrenProp] && this.item[this.childrenProp].length > 0
      },
    },
    methods: {
      dragstart(event) {
        const item = this.item || this.$parent.item
        this.notifyDragStart(this.group, event, item)
      },
      touchend(event) {
        this.onDragEnd(event)
      },
      touchmove(event) {
        this.notifyMouseMove(this.group, event)
      }
    }
  }
</script>
