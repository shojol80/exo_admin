import store from '@/store'

export default {
    async initApp({commit,dispatch}) {
        const modules = store._modules.root._children
        const initActions = []
        for (let [key, value] of Object.entries(modules)) {
            if (value._rawModule.actions && value._rawModule.actions.initModule) {
                initActions.push(dispatch(`${key}/initModule`, {}, {root: true}))
            }
        }
        await Promise.all(initActions)
        commit('initComplite')
    },
    screenMode({commit, dispatch}, {mode}) {
        if (mode === 'POPUP') {
            document.body.classList.remove('sidebar-lg-show', 'sidebar-fixed');
            document.body.classList.add('mode-popup');
        } else {
            document.body.classList.add('mode-fullscreen', 'sidebar-lg-show', 'sidebar-fixed');
        }
        commit('setScreenMode', mode)
    },
}


