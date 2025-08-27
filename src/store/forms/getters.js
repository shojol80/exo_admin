import app from "@/main"

export default {
    forms(state) {
        return state.forms
    },
    getForm: state => form_id => {
        return state.forms.find(form => +form.form_id === +form_id)
    },
    form_permalinks: state => {
      return state.forms.reduce((acc, form) => {
          return acc.concat(form.form_permalinks)
      },[])
    },
    getFormByName: state => form_name => {
        return state.forms.find(form => form.form_name === form_name)
    },
    isMailable: state => form_id => {
        let form = state.forms.find(form => +form.form_id === +form_id)
        if (form.form_name === app.ECO.define.FORM_MAIL_TEMPLATE) return true
        return form.form_questions.some(fq => {
            return +fq.fq_type === +app.ECO['forms']['fqt']['mailable']['fqt_id']
        })

    },
};
