import users from '@/services/api/users'

export default {
    async initModule({commit, dispatch}) {
        await dispatch('loadUsergroups')
        exoEventBus.$on('exo-api-call:users/saveUsergroup', () => dispatch('loadUsergroups'))
        exoEventBus.$on('exo-api-call:users/deleteUsergroup', () => dispatch('loadUsergroups'))
    },

    loadUsergroups({commit}) {
        return users.getUsergroups()
            .then(data => commit('setUsergroups', data.data))
    }
}
