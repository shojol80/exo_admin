import Api from "@/services/api/Api"

export default {
    loadReactLayout(params, config) {
        return Api.post('/reactlayout/loadReactLayout', ...arguments)
    },

    saveReactLayout(params, config) {
        return Api.post('/reactlayout/saveReactLayout', ...arguments)
    },

    loadTemplates(params, config) {
        return Api.post('/reactlayout/loadTemplates', ...arguments)
    },

    loadBlocks(params, config) {
        return Api.post('/reactlayout/loadBlocks', ...arguments)
    },

    searchBlocks(params, config) {
        return Api.post('/reactlayout/searchBlocks', ...arguments)
    },

    saveReactScope(params, config) {
        return Api.post('/reactlayout/saveReactScope', ...arguments)
    },

    saveFilter(params, config) {
        return Api.post('/reactlayout/saveFilter', ...arguments)
    },

    loadFilter(params, config) {
        return Api.post('/reactlayout/loadFilter', ...arguments)
    },
}
