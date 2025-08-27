export default {
    setSite(state, site) {
        state.site = Object.assign({}, site)
    },

    setVars(state, vars) {
        state.vars = Object.assign({}, vars)
    },
}
