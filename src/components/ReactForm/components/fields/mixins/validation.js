import InvalidFeedback from "@/components/ReactForm/components/InvalidFeedback";

export default {
    components: {InvalidFeedback},
    methods: {
        inputState(errors=[], valid) {
            return errors[0] || this.serverErrors.length ? false : null
        },
        inputErrors(errors=[]) {
            return errors.concat(this.serverErrors)
        },
    },
    computed: {
        serverErrors() {
            return this.$store.getters['reactForm/fieldErrors'](this.fq.fq_name)
        },
        ruleObject() {
            return {
                required: !!parseInt(this.fq.fq_isrequired),
                email: this.fq.fqt_name === 'useremail'
            }
        },
    },
}
