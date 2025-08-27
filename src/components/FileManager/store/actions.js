/* eslint-disable max-len,prefer-destructuring,object-curly-newline */
import GET from '../http/get';
import POST from '../http/post';

import EventBus from '../eventBus'

export default {
    /**
     * Get initiation data from server
     * @param state
     * @param commit
     * @param getters
     * @param dispatch
     */
    initializeApp({state, commit, getters, dispatch}) {
        GET.initialize({
            startDisk: state.settings.startDisk,
            startFolder: state.settings.startFolder,
            startSelection: state.settings.startSelection
        }).then(async (data) => {
            commit('settings/initSettings', data.config);
            commit('setDisks', data.config.disks);

            let leftDisk = data.config.leftDisk
                ? data.config.leftDisk
                : getters.diskList[0];

            let rightDisk = data.config.rightDisk
                ? data.config.rightDisk
                : getters.diskList[0];

            // paths
            let leftPath = data.config.leftPath;
            let rightPath = data.config.rightPath;


            commit('left/setDisk', leftDisk);

            // if leftPath not null
            if (leftPath) {
                commit('left/setSelectedDirectory', leftPath);
                commit('left/addToHistory', leftPath);
            }

            if (data.config.selected && data.config.selected.files) {
                commit('left/setSelected', {type: 'files', path: data.config.selected.files[0]})
            }

            dispatch('getLoadContent', {
                manager: 'left',
                disk: leftDisk,
                path: leftPath,
            });

            // if selected left and right managers
            if (state.settings.windowsConfig === 3) {
                commit('right/setDisk', rightDisk);

                // if rightPath not null
                if (rightPath) {
                    commit('right/setSelectedDirectory', rightPath);
                    commit('right/addToHistory', rightPath);
                }

                dispatch('getLoadContent', {
                    manager: 'right',
                    disk: rightDisk,
                    path: rightPath,
                });
            } else if (state.settings.windowsConfig === 2) {
                // if selected left manager and directories tree
                // init directories tree
                dispatch('xtree/fetchTree', /*{path: leftPath}*/);
            }
        });
    },

    /**
     * Download files and folders to the selected file manager
     * @param context
     * @param manager
     * @param disk
     * @param path
     */
    getLoadContent(context, {manager, disk, path}) {
        GET.content(disk, path).then((data) => {
            context.commit(`${manager}/setDirectoryContent`, data);
        });
    },

    /**
     * Select disk
     * @param state
     * @param commit
     * @param dispatch
     * @param disk
     * @param manager
     */
    selectDisk({state, commit, dispatch}, {disk, manager}) {
        GET.selectDisk(disk).then((data) => {
            // if disk exist => change disk
            // set disk name
            commit(`${manager}/setDisk`, disk);

            // reset history
            commit(`${manager}/resetHistory`);

            // reinitialize tree if directories tree is shown
            if (state.settings.windowsConfig === 2) {
                dispatch('xtree/fetchTree', {});
            }

            // download content for root path
            dispatch(`${manager}/selectDirectory`, {path: null, history: false});
        });
    },

    /**
     * Create new file
     * @param getters
     * @param dispatch
     * @param fileName
     * @returns {Promise}
     */
    createFile({getters, dispatch}, fileName) {
        // directory for new file
        const selectedDirectory = getters.selectedDirectory;

        // create new file, server side
        return POST.createFile(getters.selectedDisk, selectedDirectory, fileName)
            .then((data) => {
                // update file list
                dispatch('updateContent', {
                    data,
                    oldDir: selectedDirectory,
                    commitName: 'addNewFile',
                    type: 'file',
                });

                return data;
            });
    },

    /**
     * Get file content
     * @param context
     * @param disk
     * @param path
     * @returns {*}
     */
    getFile(context, {disk, path}) {
        return GET.getFile(disk, path).then(
            response => {
                return response.request.responseText
            });
    },

    /**
     * Update file
     * @param getters
     * @param dispatch
     * @param formData
     * @returns {PromiseLike | Promise}
     */
    updateFile({getters, dispatch}, formData) {
        return POST.updateFile(formData).then((data) => {
            // update file list
            dispatch('updateContent', {
                data,
                oldDir: getters.selectedDirectory,
                commitName: 'updateFile',
                type: 'file',
            });

            return data;
        });
    },

    /**
     * Create new directory
     * @param getters
     * @param dispatch
     * @param name
     * @returns {*|PromiseLike<T | never>|Promise<T | never>}
     */
    createDirectory({getters, dispatch}, {name, path}) {
        // directory for new folder
        let selectedDirectory = getters.selectedDirectory;

        if (path !== undefined) {
            selectedDirectory = path;
        }

        // create new directory, server side
        return POST.createDirectory({
            disk: getters.selectedDisk,
            path: selectedDirectory,
            name,
        }).then((data) => {
            // update file list
            dispatch('updateContent', {
                data,
                oldDir: selectedDirectory,
                commitName: 'addNewDirectory',
                type: 'directory',
            });

            return data;
        });
    },

    /**
     * Upload file or files
     * @param getters
     * @param commit
     * @param dispatch
     * @param files
     * @param overwrite
     * @returns {Promise}
     */
    upload({getters, commit, dispatch}, {files, fileURL, overwrite}) {
        // directory where files will be uploaded
        const selectedDirectory = getters.selectedDirectory;

        // create new form data
        const data = new FormData();
        data.append('disk', getters.selectedDisk);
        data.append('path', selectedDirectory || '');
        data.append('fileURL', fileURL || '');
        data.append('overwrite', overwrite);
        // add file or files
        for (let i = 0; i < files.length; i += 1) {
            data.append('files[]', files[i]);
        }

        // axios config - progress bar
        const config = {
            onUploadProgress(progressEvent) {
                const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                commit('messages/setProgress', progress);
            },
        };

        // upload files
        return POST.upload(data, config).then((data) => {
            // clear progress
            commit('messages/clearProgress');

            // if files uploaded successfully
            if (selectedDirectory === getters.selectedDirectory) {
                // refresh content
                dispatch('refreshManagers');
            }

            return data;
        }).catch((error) => {
            // clear progress
            commit('messages/clearProgress');
            throw error
        });
    },

    /**
     * Delete selected files and folders
     * @param state
     * @param getters
     * @param dispatch
     * @param items
     * @returns {*|PromiseLike<T | never>|Promise<T | never>}
     */
    delete({state, getters, dispatch}, items) {
        return POST.delete({
            disk: getters.selectedDisk,
            items,
        }).then((data) => {
            // if all items deleted successfully
            // refresh content
            dispatch('refreshManagers');

            // delete directories from tree
            if (state.settings.windowsConfig === 2) {
                const onlyDir = items.filter(item => item.type === 'dir');
                dispatch('xtree/fetchTree', {});
            }

            return data;
        });
    },

    /**
     * Paste files and folders
     * @param state
     * @param commit
     * @param getters
     * @param dispatch
     */
    paste({state, commit, getters, dispatch}) {
        POST.paste({
            disk: getters.selectedDisk,
            path: getters.selectedDirectory,
            clipboard: state.clipboard,
        }).then((data) => {
            // if the action was successful
            // refresh content
            dispatch('refreshAll');

            // if action - cut - clear clipboard
            if (state.clipboard.type === 'cut') {
                commit('resetClipboard');
            }
        });
    },

    /**
     * Rename file or folder
     * @param getters
     * @param dispatch
     * @param type
     * @param newName
     * @param oldName
     * @returns {Promise}
     */
    rename({getters, dispatch}, {type, newName, oldName}) {
        return POST.rename({
            disk: getters.selectedDisk,
            newName,
            oldName,
            type
        }).then((data) => {
            // refresh content
            if (type === 'dir') {
                dispatch('refreshAll');
            } else {
                dispatch('refreshManagers');
            }

            return data;
        });
    },

    /**
     * Get file url
     * @param store
     * @param disk
     * @param path
     * @returns {Promise}
     */
    url(store, {disk, path}) {
        return GET.url(disk, path);
    },

    /**
     * Zip files and folders
     * @param state
     * @param getters
     * @param dispatch
     * @param name
     * @returns {*|PromiseLike<T | never>|Promise<T | never>}
     */
    zip({state, getters, dispatch}, name) {
        const selectedDirectory = getters.selectedDirectory;

        return POST.zip({
            disk: getters.selectedDisk,
            path: selectedDirectory,
            name,
            elements: state[state.activeManager].selected,
        }).then((data) => {
            // if zipped successfully
            if (selectedDirectory === getters.selectedDirectory
            ) {
                // refresh content
                dispatch('refreshManagers');
            }

            return data;
        });
    },

    /**
     * Unzip selected archive
     * @param getters
     * @param dispatch
     * @param folder
     * @returns {*|PromiseLike<T | never>|Promise<T | never>}
     */
    unzip({getters, dispatch}, folder) {
        const selectedDirectory = getters.selectedDirectory;

        return POST.unzip({
            disk: getters.selectedDisk,
            path: getters.selectedItems[0].path,
            folder,
        }).then((data) => {
            // if unzipped successfully
            if (selectedDirectory === getters.selectedDirectory
            ) {
                // refresh
                dispatch('refreshAll');
            }

            return data;
        });
    },

    /**
     * Add selected items to clipboard
     * @param state
     * @param commit
     * @param getters
     * @param type
     */
    toClipboard({state, commit, getters}, type) {
        // if files are selected
        if (getters[`${state.activeManager}/selectedCount`]) {
            commit('setClipboard', {
                type,
                disk: state[state.activeManager].selectedDisk,
                fromPath: state[state.activeManager].selectedDirectory,
                directories: state[state.activeManager].selected.directories.slice(0),
                files: state[state.activeManager].selected.files.slice(0),
            });
        }
    },

    /**
     * Refresh content in the manager/s
     * @param dispatch
     * @param state
     * @returns {*}
     */
    refreshManagers({dispatch, state}) {
        // select what needs to be an updated
        if (state.settings.windowsConfig === 3) {
            return Promise.all([
                // left manager
                dispatch('left/refreshDirectory'),
                // right manager
                dispatch('right/refreshDirectory'),
            ]);
        }

        // only left manager
        return dispatch('left/refreshDirectory');
    },

    /**
     * Refresh All
     * @param state
     * @param getters
     * @param dispatch
     * @returns {*}
     */
    refreshAll({state, getters, dispatch}) {
        if (state.settings.windowsConfig === 2) {
            // refresh tree
            return dispatch('xtree/fetchTree', {}).then(() => Promise.all([
                // refresh manager/s
                dispatch('refreshManagers'),
            ]));
        }
        // refresh manager/s
        return dispatch('refreshManagers');
    },

    /**
     * Repeat sorting
     * @param state
     * @param dispatch
     * @param manager
     */
    repeatSort({state, dispatch}, manager) {
        dispatch(`${manager}/sortBy`, {
            field: state[manager].sort.field,
            direction: state[manager].sort.direction,
        });
    },

    /**
     * Update content - files, folders after create or update
     * @param state
     * @param commit
     * @param getters
     * @param dispatch
     * @param data
     * @param oldDir
     * @param commitName
     * @param type
     */
    updateContent({state, commit, getters, dispatch}, {data, oldDir, commitName, type}) {
        // if operation success
        if (oldDir === getters.selectedDirectory) {
            // add/update file/folder in to the files/folders list
            commit(`${state.activeManager}/${commitName}`, data[type]);
            // repeat sort
            dispatch('repeatSort', state.activeManager);

            if (
                state.settings.windowsConfig === 3 &&
                state.left.selectedDirectory === state.right.selectedDirectory &&
                state.left.selectedDisk === state.right.selectedDisk
            ) {
                // add/update file/folder in to the files/folders list (inactive manager)
                commit(`${getters.inactiveManager}/${commitName}`, data.data[type]);
                // repeat sort
                dispatch('repeatSort', getters.inactiveManager);
            }

        }
        // if tree module is showing
        if (type === 'directory' && state.settings.windowsConfig === 2) {
            // update tree module
            dispatch('xtree/fetchTree', {});
        }
    },

    /**
     * Reset application state
     * @param state
     * @param commit
     */
    resetState({state, commit}) {
        // left manager
        commit('left/setDisk', null);
        commit('left/setSelectedDirectory', null);
        commit('left/setDirectoryContent', {directories: [], files: []});
        commit('left/resetSelected');
        commit('left/resetSortSettings');
        commit('left/resetHistory');
        //commit('left/setView', 'grid');
        // modals
        commit('modal/clearModal');
        // messages
        commit('messages/clearActionResult');
        commit('messages/clearProgress');
        commit('messages/clearLoading');
        commit('messages/clearErrors');

        if (state.settings.windowsConfig === 3) {
            // right manager
            commit('right/setDisk', null);
            commit('right/setSelectedDirectory', null);
            commit('right/setDirectoryContent', {directories: [], files: []});
            commit('right/resetSelected');
            commit('right/resetSortSettings');
            commit('right/resetHistory');
            //commit('right/setView', 'table');
        } else if (state.settings.windowsConfig === 2) {
            // tree
        }

        commit('resetState');
    },

    getPathUp({state, rootGetters, getters}, path) {
        let pathUp = null

        //if this local fs
        if (getters['selectedDisk'] !== 'DB') {
            return path.split('/').slice(0, -1).join('/');
        }

        pathUp = rootGetters['fm/xtree/findParentPath'](path);
        if (pathUp !== -1) {
            return pathUp
        }
    },

    confirmSelect({getters}) {
        EventBus.$emit('selectfiles', {files: getters.selectedItems, disk: getters.selectedDisk})
    },
};
