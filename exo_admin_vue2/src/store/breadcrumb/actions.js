// actions
export default {

    setByRoute({commit, dispatch}, route) {
        let list = route.matched.filter((r) => ((r.meta && r.meta.label) || r.name) && (r.meta.breadcrumb !== false))
        //use mapper
        //if try save list dirrectly get recusuve maximum stack error
        let objList = list.filter(item => item.meta && item.meta.label).map(item => {
            return {
                label: item.meta && item.meta.label ? item.meta.label : item.name,
                name: item.name,
                path: item.path,
            }
        })

        commit('setList', objList)
    },

    updateLast({commit, dispatch}, item) {
        commit('updateLast', item)
    },

    setByArray({commit, dispatch}, list) {
        commit('setList', list)
    },
}
