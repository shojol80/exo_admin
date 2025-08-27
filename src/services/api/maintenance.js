import Api from "@/services/api/Api"

export default {
    buildSkeleton(params, config) {
        return Api.post('/maintenance/buildSkeleton', ...arguments)
    },
    recoveryPicture(params, config) {
        return Api.post('/maintenance/recoveryPicture', ...arguments)
    },
}
