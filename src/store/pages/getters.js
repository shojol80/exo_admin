export default {
    editions(state) {
        return state.editions
    },
    getEdition: state => e_id => {
        return state.editions.find(item => +item.e_id === +e_id)
    },
    getMailhosts: state => {
        return state.domains.filter(item => item.domain_ismail).map(item=>item.domain_name)
    },
};
