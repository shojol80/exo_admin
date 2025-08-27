import Api from "@/services/api/Api"

export default {
    checkUser2FA(params, config) {
        return Api.post('/auth/checkUser2FA', ...arguments)
    },

    create2FA(params, config) {
        return Api.post('/auth/create2FA', ...arguments)
    },

    disable2FA(params, config) {
        return Api.post('/auth/disable2FA', ...arguments)
    },

    signIn(params, config) {
        return Api.post('/auth/signIn', ...arguments)
    },

    enable2FA(params, config) {
        return Api.post('/auth/enable2FA', ...arguments)
    },

    getCurrentUser(params, config) {
        return Api.post('/auth/getCurrentUser', ...arguments)
    },

    signOut(params, config) {
        return Api.post('/auth/signOut', ...arguments)
    }
}
