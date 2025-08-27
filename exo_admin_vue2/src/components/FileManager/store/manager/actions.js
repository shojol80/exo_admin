/* eslint-disable object-curly-newline */
import GET from '../../http/get';

export default {
    /**
     * Load files and folders for the selected directory
     * @param state
     * @param commit
     * @param dispatch
     * @param rootState
     * @param path
     * @param history
     * @returns {Promise}
     */
    selectDirectory({state, commit, dispatch, rootState}, {path, history}) {
        // reset content
        commit('setDirectoryContent', {directories: [], files: []});

        // Save disk and path to localStorage
        localStorage.setItem('lastSelectedDisk', state.selectedDisk);
        localStorage.setItem('lastSelectedPath', path === null ? '' : path);

        // get content for the selected directory
        return GET.content(state.selectedDisk, path).then((data) => {
            commit('resetSelected');
            commit('resetSortSettings');
            commit('setDirectoryContent', data);
            commit('setSelectedDirectory', path);

            if (history) commit('addToHistory', path);
        });
    },

    /**
     * Refresh content in the selected directory
     * @param state
     * @param commit
     * @param dispatch
     */
    refreshDirectory({state, commit, dispatch}) {
        GET.content(state.selectedDisk, state.selectedDirectory).then((data) => {
            commit('resetSelected');
            commit('resetSortSettings');
            commit('resetHistory');

            // add to history selected directory
            if (state.selectedDirectory) commit('addToHistory', state.selectedDirectory);

            commit('setDirectoryContent', data);

        }).catch(() => {
            // If directory not found try to load main directory
            commit('setSelectedDirectory', null);
            dispatch('refreshDirectory');
        });
    },

    /**
     * History Back
     * @param state
     * @param commit
     * @param dispatch
     */
    historyBack({state, commit, dispatch}) {
        dispatch('selectDirectory', {
            path: state.history[state.historyPointer - 1],
            history: false,
        });
        commit('pointerBack');
    },

    /**
     * History Forward
     * @param state
     * @param commit
     * @param dispatch
     */
    historyForward({state, commit, dispatch}) {
        dispatch('selectDirectory', {
            path: state.history[state.historyPointer + 1],
            history: false,
        });
        commit('pointerForward');
    },

    /**
     * Sort data by field
     * @param context
     * @param field
     * @param direction
     */
    sortBy({state, commit}, {field, direction}) {
        if (state.sort.field === field && !direction) {
            commit('setSortDirection', state.sort.direction === 'up' ? 'down' : 'up');
        } else if (direction) {
            commit('setSortDirection', direction);
            commit('setSortField', field);
        } else {
            commit('setSortDirection', 'up');
            commit('setSortField', field);
        }
        // sort by field type
        switch (field) {
            case 'name':
                commit('sortByName');
                break;
            case 'size':
                commit('sortBySize');
                break;
            case 'type':
                commit('sortByType');
                break;
            case 'date':
                commit('sortByDate');
                break;
            case 'path':
                commit('sortByPath');
                break;
            default:
                break;
        }
    },

    filter({state, commit}, {filter}) {
        commit('setFilter', filter)
    }
};
