export default {
    last(state) {
        if (state.list.length > 0) {
            return state.list[state.list.length - 1]
        }
        return null
    },
};
