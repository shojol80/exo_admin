<template>
    <vue-context
        v-bind="$attrs"
        v-on="$listeners"
        ref="menu"
        class="x-context-menu dropdown-menu">
        <slot v-for="(_, name) in $slots" :name="name" :slot="name"/>
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData"/>
        </template>
    </vue-context>
</template>
<script>
import {VueContext} from 'vue-context';

export default {
    components: {
        VueContext,
    },
    methods: {
        open(...args) {
            return this.$refs.menu.open(...args)
        }
    }
}
</script>
<style scoped lang="scss">
.x-context-menu {
    display: block;
    margin: 0;
    min-width: 10rem;
    z-index: 1500;
    position: fixed;
}
</style>
