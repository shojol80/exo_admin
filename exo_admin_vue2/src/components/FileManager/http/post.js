import HTTP from '@/services/api/Api';

export default {
    /**
     * Create new file
     * @param disk
     * @param path
     * @param name
     * @returns {AxiosPromise<any>}
     */
    createFile(disk, path, name) {
        return HTTP.post('filemanager/createFile', {disk, path, name});
    },

    /**
     * Update file
     * @param formData
     * @returns {*}
     */
    updateFile(formData) {
        return HTTP.post('filemanager/updateFile', formData);
    },

    /**
     * Create new directory
     * @param data
     * @returns {*}
     */
    createDirectory(data) {
        return HTTP.post('filemanager/createDirectory', data);
    },

    /**
     * Upload file
     * @param data
     * @param config
     * @returns {AxiosPromise<any>}
     */
    upload(data, config) {
        return HTTP.post('filemanager/upload', data, config);
    },

    /**
     * Delete selected items
     * @param data
     * @returns {*}
     */
    delete(data) {
        return HTTP.post('filemanager/delete', data);
    },

    /**
     * Rename file or folder
     * @param data
     * @returns {*}
     */
    rename(data) {
        return HTTP.post('filemanager/rename', data);
    },

    /**
     * Copy / Cut files and folders
     * @param data
     * @returns {*}
     */
    paste(data) {
        return HTTP.post('filemanager/paste', data);
    },

    /**
     * Zip
     * @param data
     * @returns {*}
     */
    zip(data) {
        return HTTP.post('filemanager/zip', data);
    },

    /**
     * Unzip
     * @returns {*}
     * @param data
     */
    unzip(data) {
        return HTTP.post('filemanager/unzip', data);
    },
};
