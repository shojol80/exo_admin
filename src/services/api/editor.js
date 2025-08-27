import Api from "@/services/api/Api"

export default {
    loadToolbarButtons(params, config) {
        return Api.post('/editor/loadToolbarButtons', ...arguments)
    },
    saveToolbarButtons(params, config) {
        return Api.post('/editor/saveToolbarButtons', ...arguments)
    },

    getRelatedStyles({optionId, optionField}, config) {
        return Api.post('/editor/getRelatedStyles', ...arguments)
    },

    saveRelatedStyles({styles, optionId, optionField}, config) {
        return Api.post('/editor/saveRelatedStyles', ...arguments)
    },

    getStyleFormats(params = {}, config = {}) {
        return Api.post('/editor/getStyleFormats', ...arguments)
    },

    saveStyleFormats({path, content}, config = {}) {
        return Api.post('/editor/saveStyleFormats', ...arguments)
    },

}
