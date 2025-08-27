import validation from '@/components/ReactForm/components/fields/mixins/validation'
import common from "@/components/ReactForm/components/fields/mixins/common";

export default {
    mixins: [validation, common],
    model: {
        prop: 'fq',
        event: 'change'
    },
    props: {
        fq: Object,
    },
    data() {
        return {
            value: '',
        }
    },
    watch: {
        'fq.value': {
            immediate: true,
            handler(...arg) {
                this.onChangeFqValue(...arg)
            },
        },
        value(...arg) {
            this.onChangeValue(...arg)
        }
    },
    methods: {
        onChangeValue() {
            this.changeValue(this.value)
        },
        changeValue(value) {
            this.$emit('change', {fq_id: this.fq.fq_id, value})
        },
        onChangeFqValue(newValue) {
            this.value = newValue
        }
    }
}
