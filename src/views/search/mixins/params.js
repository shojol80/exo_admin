import paramsParse from '@/components/search/mixins/paramsParse'

export default {
    mixins: [paramsParse],
    data() {
        return {
            params: {
                forms: []
            },
            holder: undefined,
        }
    },
    watch: {
        allForms: {
            handler() {
                this.load()
            }
        }
    },
}
