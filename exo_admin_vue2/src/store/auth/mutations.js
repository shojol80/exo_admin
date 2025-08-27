import Vue from 'vue'

export default {
    setFromPath(state, path) {
        state.from_path = path
    },

    requestMe(state) {
        state.status = 'user_request';
        state.error = ''
    },

    request(state) {
        state.status = 'loading';
        state.error = ''
    },

    request2fa(state) {
        state.status = 'need_2fa'
    },

    success(state, user) {
        state.status = 'success';
        state.error = '';
        localStorage.setItem('user', JSON.stringify(user))
        Vue.set(state, 'user', user)
    },

    error(state, msg) {
        state.status = 'error';
        state.error = msg
    },

    logout(state) {
        state.status = '';
        localStorage.removeItem('user')
        Vue.set(state, 'user', {})
    },

    reset(state) {
        state.status = '';
        state.error = ''
    }
}
