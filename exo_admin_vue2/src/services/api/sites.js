import Api from "@/services/api/Api"

export default {
    all(params, config) {
        return Api.post('/sites/all', ...arguments)
    },
    
    export(params, config) {
        // For file downloads, we need to handle the response differently
        return Api.post('/sites/export', params, {
            responseType: 'blob',
            ...config
        }).then(response => {
            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            
            // Extract filename from response headers or use default
            const contentDisposition = response.headers['content-disposition'];
            let filename = 'sites_export.sql';
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename="(.+)"/);
                if (filenameMatch) {
                    filename = filenameMatch[1];
                }
            }
            
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            
            return response;
        });
    }
}
