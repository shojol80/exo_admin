export default {
    isUser: state => state.user.id > 0,
    isDeveloper: state => !!state.user.isdeveloper,
    status: state => state.status
}
