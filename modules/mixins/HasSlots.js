export default {
    computed: {
        hasDefaultSlot() {
            return !!this.$slots.default
        },
    },
    methods: {
        hasSlot(name) {
            return !!this.$slots[name]
        }
    }
}
