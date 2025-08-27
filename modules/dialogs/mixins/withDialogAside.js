export default {
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
            event.value = this.localValue
            this.resolve(event)
        },
        onModalHidden() {
            this.$destroy()
        },
        show() {
            if (this.hasOwnProperty('value')) this.localValue = this.getDefaultLocalValue()
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
        },
        back() {
            this.hide('back')
        },
        getDefaultLocalValue() {
            return this.value
        }
    }
}