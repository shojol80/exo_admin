import genID from '@modules/mixins/genID'

export default {
    mixins: [genID],
    methods: {
        fqTemplate() {
            return {
                fq_id: -this.genID(),
                fq_name: 'Field name',
                fq_displayname: 'Field name',
                fq_info: null,
                fq_isrequired: 0,
                fq_order: null,
                fq_ishidden: 0,
                fq_type: 1,
                fq_custom_params: null,
                fq_rules: null,
                fq_prefix: null,
                fq_postfix: null,
                values: [],
                form_questions_tree: [],
                fq_visibility: {
                    form: 0,
                    form_new: 0
                }
            }
        },
        fqvTemplate() {
            return {
                fqv_id: -this.genID(),
                fqv_site: null,
                fqv_value: null,
                fqv_displayvalue: null,
                fqv_isdefault: 0,
                fqv_custom_params: null,
            }
        },

        formTemplate() {
            return {
                form_name: 'New Form',
                form_questions_tree: [],
                vars: []
            }
        },

        buildFq(preset_fq) {
            const fq = {
                ...this.fqTemplate(),
                ...preset_fq
            }
            if (fq.values) {
                fq.values = fq.values.map(fqv => {
                    return {
                        ...this.fqvTemplate(),
                        ...fqv,
                    }
                })
            }
            return fq
        },

        buildForm(preset_form = {}) {
            let form = {
                ...this.formTemplate(),
                ...preset_form
            }
            form.form_questions_tree = form.form_questions_tree.map(fq => {
                return this.buildFq(fq)
            })
            return form
        }
    }
}
