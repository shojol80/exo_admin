import store from "@/store"
import {R_APP_INIT, R_LOGIN} from '@/router/routs'

const initApplication = (to, from, next) => {
    if (to.name !== R_APP_INIT && store.getters['auth/status'] === 'success' && !store.getters['app/initComplite']) {
        return next({name: R_APP_INIT, params: {redir: to}})
    }
}
export const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters['auth/isUser']) {
        next()
        return
    }
    next('/')
}

export const ifAuthenticated = (to, from, next) => {
    //on load we load user from localstorage and asume that user is logined
    if (store.getters['auth/isUser'] && store.getters['auth/status'] === 'success') {
        initApplication(to, from, next)
        return next()
    }
    //if no user try get user from the server(active php session)
    if (store.getters['auth/status'] === '') {
        store.dispatch('auth/requestMe').then(() => {
            initApplication(to, from, next)
            return next()
        }).catch(() => {
            //if session is end go to login page
            return next({name: R_LOGIN, params: {redir: to.path}})
        })
    } else {
        return next({name: R_LOGIN, params: {redir: to.path}})
    }
}
