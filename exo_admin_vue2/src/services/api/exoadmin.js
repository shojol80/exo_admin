import Api from "@/services/api/Api";

export default {
    getConfig(params, config) {
        return Api.post('/exoadmin/getConfig', ...arguments)
    },

    getECO(params, config) {
        return Api.post('/exoadmin/getECO', ...arguments)
    },

    getVersion(params, config) {
        return Api.post('/exoadmin/getVersion', ...arguments)
    },

    getEmailOptions(params, config) {
        return Api.post('/exoadmin/getEmailOptions', ...arguments)
    },
}
