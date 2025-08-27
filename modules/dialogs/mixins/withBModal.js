export default {
    props: {
        cancelTitle: {},
        okTitle: {},
        title: {},
        variant: {},
        hideHeaderClose: {},
    },
    data() {
        return {
            localValue: undefined,
        }
    },
    computed: {
        $dialogsProps() {
            //filter?
            return {...this.$props}
        }
    },
    methods: {
        onModalHide(event) {
            if (event.defaultPrevented) return
            event.value = this.localValue
            this.resolve(event)
        },
        onModalHidden() {
            this.$destroy()
        },
        show() {
            if (this.hasOwnProperty('value')) this.localValue = this.value
            return new Promise((resolve) => {
                this.resolve = resolve;
                this.$refs.modal.show();
            })
        },
        hide(trigger) {
            this.$refs.modal.hide(trigger);
        },
        ok() {
            this.hide('ok')
        },
        cancel() {
            this.hide('cancel')
        }
    }
}