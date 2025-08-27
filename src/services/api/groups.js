import Api from "@/services/api/Api"

export default {

    deleteGroup(params, config) {
        return Api.post('/groups/deleteGroup', ...arguments)
    },

    getGroup(params, config) {
        return Api.post('/groups/getGroup', ...arguments)
    },

    saveGroup(params, config) {
        return Api.post('/groups/saveGroup', ...arguments)
    },

    getGroupTree(params, config) {
        return Api.post('/groups/getGroupTree', ...arguments)
    },
    removeRelation(params, config) {
        return Api.post('/groups/removeRelation', ...arguments)
    },

    addRelation(params, config) {
        return Api.post('/groups/addRelation', ...arguments)
    },


}
