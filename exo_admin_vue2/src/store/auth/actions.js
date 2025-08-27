import auth from '@/services/api/auth'
import users from '@/services/api/users'

export default {
    saveRouteBeforeAuth({commit, dispatch}, path) {
        commit('setFromPath', path)
    },

    request({commit, dispatch}, user) {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
            commit('request');
            if (user.gaCode) {
                dispatch('requestDo', user).then(result => resolve(result))
            } else {
                auth.checkUser2FA({email: user.u_email})
                    .then(data => {
                        /** @namespace resp.data.is_2fa */
                        if (data.is_2fa) {
                            commit('request2fa')
                            resolve(data)
                        } else {
                            dispatch('requestDo', user).then(result => resolve(result))
                        }
                    })
                    .catch(err => {
                        let message = 'Erorr';
                        if (err.data) {
                            message = err.data.error
                        }
                        commit('error', message);
                        reject(err)
                    })
            }

        })
    },

    requestDo({commit, dispatch}, user) {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
            commit('request')
            auth.signIn({
                email: user.u_email,
                password: user.u_password,
                code: user.gaCode,
                remember: user.remember
            }).then(data => {
                commit('success', data)
                resolve(data)
            }).catch(err => {
                let message = 'Error'
                if (err.data) {
                    message = err.data.error
                }
                commit('error', message)
                reject(err)
            })
        })
    },


    logout({commit}) {
        return new Promise((resolve) => {
            auth.signOut({}, {preventShowError: true})
            commit('logout');
            resolve()
        })
    },

    reset({commit, dispatch}) {
        commit('reset');
    },

    requestMe({commit, dispatch, state}) {
        return new Promise((resolve, reject) => {
            commit('requestMe');
            auth.getCurrentUser({}, {preventShowError: true})
                .then(data => {
                    if (data.isadmin) {
                        commit('success', data)
                        resolve(data)
                    } else {
                        commit('logout')
                        reject('User has not login as admin');
                    }

                })
                .catch(error => {
                    commit('logout')
                    reject(error);
                })
        })
    },

    SendPasswordLink({commit, dispatch, state}, email) {
        return users.sendPassChangeLink({email})
    },

    changePassword({commit, dispatch, state}, {hash, password}) {
        return users.changePassword({hash, password})
    }
}
