export default function (log) {
    if (Array.isArray(log)) {
        return log.map((item) => {
            if (typeof item === 'object' && item.formatted){
                return item.formatted
            }
            else if (typeof item === 'object' && item.level) {
                return `[${item.level}] ${item.message}`
            } else if (typeof item === 'object' && item.message) {
                return `[${item.level}] ${item.message}`
            } else {
                return item
            }
        }).join('\n');
    }
    return log
}