export default {
    from_path: '/',
    status: '',
    error: '',
    user: JSON.parse(localStorage.getItem('user')) || {},
}
