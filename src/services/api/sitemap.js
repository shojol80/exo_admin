import Api from "@/services/api/Api"

export default {
    getReacts(params, config) {
        return Api.post('/sitemap/getReacts', ...arguments)
    },
}
