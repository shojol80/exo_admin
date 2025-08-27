import isEmpty from '@modules/isEmpty'
import {cloneDeep, isEqual} from 'lodash'

export default {
    model: {
        prop: 'fq',
        event: 'change'
    },
    props: {
        fq: Object,
    },
    data() {
        return {
            value: this.empty(),
        }
    },
    watch: {
        'fq.value': {
            immediate: true,
            deep: true,
            handler(newValue) {
                if (isEqual(newValue, this.value)) return
                let value
                if (isEmpty(newValue)) {
                    value = this.empty()
                } else {
                    value = cloneDeep(this.normalizeValue(newValue))
                }
                //TODO php json_decode save empty object as array
                //stop decode nested json as string
                if (value && Array.isArray(value.payload)) {
                    value.payload = {}
                }
                this.$set(this, 'value', value)
            },
        },
        value: {
            deep: true,
            handler() {
                this.$emit('change', {fq_id: this.fq.fq_id, value: cloneDeep(this.value)})
            }
        },
    },
    methods: {
        empty() {
            return {}
        },
        normalizeValue(value) {
            return Object.assign(this.empty(), value)
        },
    }
}
