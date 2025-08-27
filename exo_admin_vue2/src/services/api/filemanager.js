import Api from "@/services/api/Api"

export default {
    views(params, config) {
        return Api.post('/filemanager/views', ...arguments)
    },

    tree(params, config) {
        return Api.post('/filemanager/tree', ...arguments)
    },

    treeContent(params, config) {
        return Api.post('/filemanager/treeContent', ...arguments)
    },

    getFile(params, config) {
        return Api.get('/filemanager/getFile', {
            params,
            skipHandleResponse: true,
            progress: false,
            responseType: 'arraybuffer',
            ...config
        }).then(response => {
            if (response.headers['content-type'] && response.headers['content-type'].startsWith('image/')) {
                let arrayBufferView = new Uint8Array( response.data );
                let blob = new Blob( [arrayBufferView], { type: response.headers['content-type'] } );
                let urlCreator = window.URL || window.webkitURL;
                return urlCreator.createObjectURL(blob);
            }
            let buffer = new Buffer(response.data, 'binary');
            return buffer.toString(); // for string
        });
    },

    updateFile(params, config) {
        return Api.post('/filemanager/updateFile', ...arguments)
    },

    props(params, config) {
        return Api.post('/filemanager/props', params, config)
    },

    delete(params, config) {
        return Api.post('/filemanager/delete', ...arguments)
    },

    createFile(params, config) {
        return Api.post('/filemanager/createFile', ...arguments)
    },

    createDirectory(params, config) {
        return Api.post('/filemanager/createDirectory', ...arguments)
    },

    rename(params, config) {
        return Api.post('/filemanager/rename', ...arguments)
    },


}
