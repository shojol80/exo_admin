// Dynamic import to avoid circular dependencies
let forms = null;
const getFormsApi = async () => {
    if (!forms) {
        forms = (await import('@/services/api/forms')).default;
    }
    return forms;
};

export default {
    async load({state, commit, getters, dispatch, rootState}, {form_id}) {
        const formsApi = await getFormsApi();
        const value = await formsApi.getForm({
            form_id: form_id
        });
        commit('setForm', value)
    },
};
