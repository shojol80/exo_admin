import site from '@/services/api/site'
import vars from '@/services/api/vars'

export default {
    async initModule({dispatch}) {
        await dispatch('loadSite')
        await dispatch('loadSiteVars')
    },

    async loadSite({commit, dispatch}) {
        const siteRow = await site.getCurrentSite()
        commit('setSite', siteRow)
    },

    loadSiteVars({commit, dispatch, state}) {
        return vars.getVars({
            var_parent: state.site_id,
            var_type: 'site'
        }).then(data => commit('setVars', data))
    },
}
