import Str from 'laravel-js-str';
//import filemanager from '@/services/api/filemanager'

export default {
    DISK_DELIMITER: '::',
    parseFileId(fileId) {
        fileId = fileId.toString();
        if (Str.of(fileId.toString()).contains(this.DISK_DELIMITER)) {
            return [
                Str.of(fileId).before(this.DISK_DELIMITER).toString(),
                Str.of(fileId).after(this.DISK_DELIMITER).toString()
            ]
        } else {
            return ['DB', fileId];
        }
    },
    selectionToFileId({files, disk}) {
        if (disk === 'DB') {
            return files[0].path
        } else {
            return disk + this.DISK_DELIMITER + files[0].path;
        }
    },
    async basename(fileId) {
        throw new Error('Not Implemented!')
        //let [disk, path] = this.parseFileId(this.value.file_id)
        //let file = await filemanager.props({disk, path})
        //return file['basename']
    }
}