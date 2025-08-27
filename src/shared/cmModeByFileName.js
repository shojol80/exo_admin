import getFilenameExtension from '@/shared/getFilenameExtension'

export default function cmModeByFileName(filename) {
    const modesByExt = {
        'html': 'php',
        'php': 'php',
        'js': 'javascript',
        'json': 'javascript',
        'xml': 'xml',
        'txt': 'text',
        'css': 'css',
        'less': 'css',
        'tpl': 'htmlmixed'
    }

    let mode = modesByExt[getFilenameExtension(filename)];
    return mode ? mode : 'htmlmixed'
}
