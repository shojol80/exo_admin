import Api from "@/services/api/Api"

export default {
    getCurrentSite(params, config) {
        return Api.post('/site/getCurrentSite', ...arguments)
    }
}
