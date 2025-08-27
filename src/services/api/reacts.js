import Api from "@/services/api/Api"

export default {
    deleteReact(params, config) {
        return Api.post('/reacts/deleteReact', ...arguments)
    },

    getReact({react_id}) {
        return Api.post('/reacts/getReact', ...arguments)
    },

    saveReact({form, react}) {
        return Api.post('/reacts/saveReact', ...arguments)
    },
    updateReactEdition({react_id, e_id}) {
        return Api.post('/reacts/updateReactEdition', ...arguments)
    },

    saveReactFieldValue({react_id, name, value}, config) {
        return Api.post('/reacts/saveReactFieldValue', ...arguments)
    },

    searchByFormsFields(params, config) {
        return Api.post('/reacts/searchByFormsFields', ...arguments)
    },

    loadReactForm(params, config) {
        return Api.post('/reacts/loadReactForm', ...arguments)
    },

    submitReactForm(params, config) {
        return Api.post('/reacts/submitReactForm', ...arguments)
    },

    setHomepageReact(params, config) {
        return Api.post('/reacts/setHomepageReact', ...arguments)
    },

    getPermalink(params, config) {
        return Api.post('/reacts/getPermalink', ...arguments)
    },
}
