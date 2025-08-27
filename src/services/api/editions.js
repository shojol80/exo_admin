import Api from "@/services/api/Api"

export default {

    saveEdition(params, config) {
        return Api.post('/editions/saveEdition', ...arguments)
    },

    getEditions(params, config) {
        return Api.post('/editions/getEditions', ...arguments)
    },

    getEdition(params, config) {
        return Api.post('/editions/getEdition', ...arguments)
    },

    deleteEdition(params, config) {
        return Api.post('/editions/deleteEdition', ...arguments)
    },

    getExoAdminTree(params, config) {
        return Api.post('/editions/getExoAdminTree', ...arguments)
    },

    setDefaultEdition(params, config) {
        return Api.post('/editions/setDefaultEdition', ...arguments)
    }
}
