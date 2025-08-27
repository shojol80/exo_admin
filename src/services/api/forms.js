import Api from "@/services/api/Api";


export default {
    getForms(params, config) {
        return Api.post('/forms/getForms', ...arguments)
    },

    getForm(params, config) {
        return Api.post('/forms/getForm', ...arguments)
    },

    saveForm(params, config) {
        return Api.post('/forms/saveForm', ...arguments)
    },

    deleteForm(params, config) {
        return Api.post('/forms/deleteForm', ...arguments)
    },

    getFormPermalinks(params, config) {
        return Api.post('/forms/getFormPermalinks', ...arguments)
    },

    saveFormPermalinks(params, config) {
        return Api.post('/forms/saveFormPermalinks', ...arguments)
    },

    updatePermalinks({fp_id}, config) {
        return Api.post('/forms/updatePermalinks', ...arguments)
    },


}
