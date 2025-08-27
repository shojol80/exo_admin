import isEmpty from '@modules/isEmpty'
import reacts from '@/services/api/reacts'
import params from './params'

export default {
    mixins: [params],

    computed: {
        isLoading() {
            return isEmpty(this.holder)
        }
    },
    watch: {
        react_id: {
            immediate: true,
            handler() {
                this.load()
            }
        },
    },
    methods: {
        async load() {
            if (isEmpty(this.allForms)) return
            let react = await reacts.getReact({react_id: this.react_id})
            if (isEmpty(react)) {
                this.$awn.alert(`React is not found! (react_id=${this.react_id})`)
                return
            }
            this.holder = react
            this.params = this.paramsParse(react.params, this.allForms)
        },
    },
}
