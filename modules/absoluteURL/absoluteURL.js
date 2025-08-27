export default (link, host = null) => {
    if (link.startsWith('http')) return link
    host = host || window.location.origin
    return host + (link[0] === '/' ? '' : '/') + link
}