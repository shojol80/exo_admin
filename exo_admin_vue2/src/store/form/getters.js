export default {
    form: state => {
        return state.form
    },
    fq: state => fq_id => {
        return state.form.form_questions.find(item => item.fq_id === fq_id)
    }
};
