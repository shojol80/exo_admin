import Api from "@/services/api/Api"

export default {
    getDomains(params, config) {
        return Api.post('/domains/getDomains', ...arguments)
    },

    validateSubdomain(params, config) {
        return Api.post('/domains/validateSubdomain', ...arguments)
    }
}
