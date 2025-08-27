export default {
    getSiteVarValue: (state) => (name) => {
        let _var = Object.values(state.vars).find(item => item.var_name === name)
        return _var ? _var.var_value : undefined
    },
    site_alias: state => {
        return state.site.site_alias
    }
}
