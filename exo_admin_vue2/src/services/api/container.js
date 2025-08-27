import Api from "@/services/api/Api"

export default {
    getItemsTree(params, config) {
        return Api.post('/container/getItemsTree', ...arguments)
    },
    setItems(params, config) {
        return Api.post('/container/setItems', ...arguments)
    },
    getContainerConfig(params, config) {
        return Api.post('/container/getContainerConfig', ...arguments)
    },
    setContainerConfig(params, config) {
        return Api.post('/container/setContainerConfig', ...arguments)
    },
    getContainerConfigByScope(params, config) {
        return Api.post('/container/getContainerConfigByScope', ...arguments)
    },
    getContainerCommonConfig(params, config) {
        return Api.post('/container/getContainerCommonConfig', ...arguments)
    },
    setContainerCommonConfig(params, config) {
        return Api.post('/container/setContainerCommonConfig', ...arguments)
    },
    getUselessItems(params, config) {
        return Api.post('/container/getUselessItems', ...arguments)
    },
    addItems({container, items}, config) {
        return Api.post('/container/addItems', ...arguments)
    },
    copyItem({container, path}, config) {
        return Api.post('/container/copyItem', ...arguments)
    },
    removeItem({container, path}, config) {
        return Api.post('/container/removeItem', ...arguments)
    },
    getRelatedReactRules({container, rules, react_id, rule_name}, config) {
        return Api.post('/container/getRelatedReactRules', ...arguments)
    },
    saveRelatedReactRules({container, react_id, rule_name, rules}, config) {
        return Api.post('/container/saveRelatedReactRules', ...arguments)
    },
    getHolderForm({container}, config) {
        return Api.post('/container/getHolderForm', ...arguments)
    }
}
