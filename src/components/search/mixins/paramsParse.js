export default {
    computed: {
        allForms() {
            return this.$store.getters['forms/forms']
        },
        forms() {
            return this.convert(this.params.forms)
        },
    },
    methods: {
        /**
         * Parse serialized forms and enrich(merge) it with actual forms data
         * */
        paramsParse(paramsStr, formsData) {
            let params = {
                forms: []
            };
            if (paramsStr.length > 0) {
                params = JSON.parse(paramsStr)
                if (params['forms']) {
                    params.forms = params.forms.map(form => {
                        let fullForm = formsData.find(f => +f.form_id === +form.form_id)
                        form.form_name = fullForm.form_name
                        return form
                    })
                } else {
                    params.forms = []
                }
            }
            return params
        },

        /**
         * clean up params before save save only id (due name can be changed)
         * */
        paramsSerialize(params) {
            let result = params
            result.forms = params.forms
            return JSON.stringify(result);
        },

        convert(forms) {
            if (!forms) return [];
            return forms.map(item => {
                return {
                    form_id: item.form_id,
                    form_questions: item.form_questions.map(fq => {
                        return {
                            fq_form: item.form_id,
                            fq_id: fq
                        }
                    })
                }
            })
        },
    },
}
