import Api from "@/services/api/Api"

export default {
    getUsergroups(params, config) {
        return Api.post('/users/getUsergroups', ...arguments)
    },

    getUsergroup(params, config) {
        return Api.post('/users/getUsergroup', ...arguments)
    },

    saveUsergroup(params, config) {
        return Api.post('/users/saveUsergroup', ...arguments)
    },

    deleteUsergroup(params, config) {
        return Api.post('/users/deleteUsergroup', ...arguments)
    },

    getUsers(params, config) {
        return Api.post('/users/getUsers', ...arguments)
    },
    getUser(params, config) {
        return Api.post('/users/getUser', ...arguments)
    },
    /**
     * @typedef SaveUserResponse
     * @property {int} u_id
     */
    /**
     * Save user
     * @return {Promise<SaveUserResponse>}
     */
    saveUser(params, config) {
        return Api.post('/users/saveUser', ...arguments)
    },
    deleteUser(params, config) {
        return Api.post('/users/deleteUser', ...arguments)
    },

    removeUsersFromUsergroup(params, config) {
        return Api.post('/users/removeUsersFromUsergroup', ...arguments)
    },

    addUsersToUsergroup(params, config) {
        return Api.post('/users/addUsersToUsergroup', ...arguments)
    },

    getUserMailbox(params, config) {
        return Api.post('/users/getUserMailbox', ...arguments)
    },
    saveUserMailbox(params, config) {
        return Api.post('/users/saveUserMailbox', ...arguments)
    },

    sendPassChangeLink(params, config) {
        return Api.post('/users/sendPassChangeLink', ...arguments)
    },

    changePassword(params, config) {
        return Api.post('/users/changePassword', ...arguments)
    },
}


