<template>
    <aside-panel
        v-bind="$attrs"
        v-on="$listeners"
        ref="modal">
        <slot v-for="(_, name) in $slots" :name="name" :slot="name"/>
        <template v-for="(_, name) in $scopedSlots" :slot="name" slot-scope="slotData">
            <slot :name="name" v-bind="slotData"/>
        </template>
    </aside-panel>
</template>
<script>

export default {
    name: 'DialogAside',
    props: {},
    methods: {
        show() {
            this.$refs.modal.show();
        },
        hide(trigger) {
            this.$refs.modal.hide(trigger);
        },
    }
}
</script>
