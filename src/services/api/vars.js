import Api from "@/services/api/Api"

export default {
    getVars(params, config) {
        return Api.post('/vars/getVars', ...arguments)
    },

    saveVars(params, config) {
        return Api.post('/vars/saveVars', ...arguments)
    }
}
