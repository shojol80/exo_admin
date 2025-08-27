import xListeners from '@/mixins/xListeners'

export default {
    mixins: [xListeners],
    model: {
        prop: 'value',
        event: 'input'
    },
    props: {
        id: [String, Number],
        title: String,
        dbField: String,
        description: String,
        name: {
            type: String,
            default() {
                return this.dbField
            }
        },
        value: null,
        valid: null,
        errors: {
            type: null,
            default() {
                return []
            }
        },
        labelColsSm: {
            default: 3
        },
        labelColsLg: {
            default: 2
        }
    },
    methods: {
        inputState(errors, valid) {
            return errors[0] ? false : null
        },
    },
    computed: {
        idComputed() {
            if (this.id) return this.id
            if (this.name) return this.name
        }
    }
}
