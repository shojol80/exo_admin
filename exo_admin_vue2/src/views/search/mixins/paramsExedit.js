import params from "./params"
import isEmpty from '@modules/isEmpty'
import vars from '@/services/api/vars'

export default {
    mixins: [params],
    props: {
        exedit: {
            type: String,
            required: true
        }
    },
    computed: {
        exeditData() {
            try {
                return JSON.parse(this.exedit)
            } catch (e) {
                this.$awn.alert('Incorrect "exedit" attribute')
                return {}
            }
        }
    },
    watch: {
        exeditData: {
            immediate: true,
            handler() {
                this.load()
            }
        },
    },
    methods: {
        async load() {
            if (this.exeditData.type !== 'var') {
                this.$awn.alert('Search settings support only var holder!')
            }
            let v = await vars.getVars({
                var_id: this.exeditData.id,
            })
            if (isEmpty(v)) {
                this.$awn.alert(`Vars is not found!`)
                return
            }
            this.holder = v[0]
            this.params = this.paramsParse(this.holder.var_value, this.allForms)
        },
    },
}
