export default {

    /**
     * Filtered directories list
     * @param state
     * @param getters
     * @param rootState
     * @returns {*}
     */
    tree(state, getters, rootState) {
        return state.directories
    },

    findParentPath: state => path => {
        function find(directories) {
            for (let i = 0; i < directories.length; i++) {
                if (directories[i].path === path) return directories[i].parentPath
                if (directories[i].directories && directories[i].directories.length > 0) {
                    let parentPath = find(directories[i].directories)
                    if (parentPath !== -1) return parentPath
                }
            }
            return -1
        }

        return find(state.directories)
    },
};
