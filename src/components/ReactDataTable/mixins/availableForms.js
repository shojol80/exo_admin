import isEmpty from '@modules/isEmpty'

export default {
    computed: {
        availableForms() {
            let storeForms = this.$store.getters['forms/forms']
            if (isEmpty(storeForms)) return []

            storeForms = storeForms.map(form => {
                return {
                    ...form,
                    id: form.form_id,
                    label: form.form_name, //used in vue-treeselect
                    form_questions: form.form_questions.map(question => {
                        return {
                            ...question,
                            id: question.fq_id,
                            label: question.fq_name,
                        }
                    })
                }
            })

            if (this.forms === true) {
                return storeForms
            } else {
                //filter availableForms by form and fields
                let filterdForms = []
                storeForms.forEach(form => {
                    let i = this.forms.findIndex(f => parseInt(f.form_id) === parseInt(form.form_id))
                    if (i !== -1) {
                        let filterdForm = form
                        if (this.forms[i].form_questions && this.forms[i].form_questions.length > 0) {
                            //filter by form_questions
                            filterdForm.form_questions = form.form_questions.filter(fq => {
                                return -1 !== this.forms[i].form_questions.findIndex(f_fq => parseInt(f_fq.fq_id) === parseInt(fq.fq_id))
                            })
                        }
                        filterdForms.push(filterdForm)
                    }
                })
                return filterdForms
            }
        },

        availableFormsFilter() {
            let storeForms = this.$store.getters['forms/forms']
            if (isEmpty(storeForms)) return []

            storeForms = storeForms.map(form => {
                return {
                    ...form,
                    id: form.form_name,
                    text: form.form_id +' - '+form.form_name, //used in vue-treeselect
                }
            })

            if (this.forms === true) {
                return storeForms
            } else {
                //filter availableForms by form and fields
                let filterdForms = []
                storeForms.forEach(form => {
                    let i = this.forms.findIndex(f => parseInt(f.form_id) === parseInt(form.form_id))
                    if (i !== -1) {
                        filterdForms.push(form)
                    }
                })
                return filterdForms
            }
        }
    }
}
