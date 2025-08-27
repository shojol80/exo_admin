export default {
    computed: {
        form() {
            const form_id = this.$store.getters['controller/getActionFormId']
            return form_id ? this.$store.getters['forms/getForm'](form_id) : undefined
        },
        form_questions() {
            return this.form.form_questions
        },
        fqtArrayId() {
            return this.$store.getters['ECO/fqtArrayId']
        },
        rules() {
            return this.$store.getters['controller/formActions/rules']
        },
    }
}
