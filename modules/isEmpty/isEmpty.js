export default (value) => {
    return value === undefined
        || value === null
        || value === ''
        || Number.isNaN(value)
        || (Array.isArray(value) && value.length === 0)
}
