export default function objectToXeditId(obj) {
    if (!obj) return ''
    return Object.entries(obj).filter(([key, value]) => !(value === undefined || value === null)).map(([key, value]) => {
        if (value === true) return key
        else return key + ':' + value
    }).join('|')
}