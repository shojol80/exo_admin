import GET from '../../http/get';

export default {
    /*    /!**
         * Initialize directories tree
         * @param state
         * @param commit
         * @param rootGetters
         * @param disk
         * @returns {Promise}
         *!/
        initTree({state, commit, rootGetters}, disk) {
            let rootPath = rootGetters['fm/settings/rootPath']
            return GET.tree(disk, rootPath).then((data) => {
                // clean the tree, if need
                if (state.directories) commit('cleanTree');

                // initialize directories tree
                commit('addDirectories', {
                    parentId: 0,
                    directories: data.directories,
                });
            });
        },*/

    fetchTree({commit, rootGetters}) {
        let path = null
        if (rootGetters['fm/settings/rootPath']) {
            path = rootGetters['fm/settings/rootPath']
        }
        return GET.tree(rootGetters['fm/selectedDisk'], path).then(data => {
            let tree = data.directories
            if (!path || path === rootGetters['fm/settings/rootPath']) {
                tree = [{
                    path: !rootGetters['fm/settings/rootPath'] ? "0" : rootGetters['fm/settings/rootPath'],
                    basename: rootGetters['fm/selectedDisk'],
                    isBatch: false,
                    state: {
                        "selected": rootGetters['fm/selectedDirectory'] == null,
                        "selectable": true,
                        "checked": false,
                        "expanded": true,
                        "indeterminate": false,
                        "matched": false,
                        "editable": false,
                        "deleteble": false,
                        "append": true,
                        "dragging": false,
                        "draggable": false,
                        "dropable": true
                    },
                    data: {
                        type: 'root'
                    },
                    directories: tree
                }]
            }

            commit('setTree', {tree, path})
            return tree
        });
    }

};
