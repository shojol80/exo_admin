/* eslint-disable no-unused-vars */
import axios from 'axios'
import store from '@/store'
import exoEventBus from "@modules/exoEventBus"
import {R_LOGIN} from '@/router/routs'
import {get} from "lodash";
import isEmpty from "@modules/isEmpty";

// Get current app instance and router - will be set after app is created
let currentApp = null;
let currentRouter = null;

export function setCurrentApp(app) {
    currentApp = app;
}

export function setCurrentRouter(router) {
    currentRouter = router;
}

class Api {
    constructor() {
        this.progress = false;
        this.timer = 0;
        let service = axios.create({
            baseURL: '/api/',
            withCredentials: false,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        service.interceptors.request.use(this.handleRequest.bind(this));
        service.interceptors.response.use(this.handleSuccess.bind(this), this.handleError.bind(this));
        this.service = service;
    }

    handleRequest(config) {
        if (!config.progress) {
            this.progress = true
            if (currentApp && currentApp.config.globalProperties.$Progress) {
                currentApp.config.globalProperties.$Progress.start()
            }
            this.checkProgress()
        }

        if (!config.data) {
            config.data = {}
        }
        return config;
    }

    finishProgressTimer(response) {
        if (!this.progress) return
        this.progress = false;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = 0;
        }
    }

    handleSuccess(response) {
        this.finishProgressTimer()

        if (response.config.skipHandleResponse) return response

        if (!response.data.success) {
            if (currentApp && currentApp.config.globalProperties.$Progress) {
                currentApp.config.globalProperties.$Progress.fail()
            }

            //normalize
            response.message = response.data.error

            //Support custom 401 for old API
            if (response.data.code === 401) {
                //if you ever get an unauthorized, logout the admin
                store.dispatch('auth/logout')
                // you can also redirect to /login if needed !
                const currentRoute = currentRouter ? currentRouter.currentRoute.value : null;
                if (currentRoute && currentRoute.name !== R_LOGIN) {
                    if (currentRouter) {
                        currentRouter.push({name: R_LOGIN, params: {redir: currentRoute.path}});
                    }
                }

            } else {
                if (response.message === undefined) response.message = 'Unknown error or no response from the server. Please contact the administrator.';

                if (!response.config.preventShowError) {
                    catchApiError(response);
                }
            }
            return Promise.reject(response)
        }

        if (currentApp && currentApp.config.globalProperties.$Progress) {
            currentApp.config.globalProperties.$Progress.finish()
        }

        if (response.data && response.data.info) {
            if (Array.isArray(response.data.info)) {
                response.data.info.forEach(info => {
                    if (currentApp && currentApp.config.globalProperties.$awn) {
                        currentApp.config.globalProperties.$awn.info(info);
                    }
                })
            } else {
                if (currentApp && currentApp.config.globalProperties.$awn) {
                    currentApp.config.globalProperties.$awn.info(response.data.info);
                }
            }
        }
        if (response.data && response.data.warning) {
            if (Array.isArray(response.data.warning)) {
                response.data.warning.forEach(warning => {
                    if (currentApp && currentApp.config.globalProperties.$awn) {
                        currentApp.config.globalProperties.$awn.warning(warning);
                    }
                })
            } else {
                if (currentApp && currentApp.config.globalProperties.$awn) {
                    currentApp.config.globalProperties.$awn.warning(response.data.warning);
                }
            }
        }

        if (!response.data.hasOwnProperty('data')) {
            if (currentApp && currentApp.config.globalProperties.$awn) {
                currentApp.config.globalProperties.$awn.warning('API did not return data property!');
            }
        }

        let data = response.data.data

        if (data === undefined) {
            if (currentApp && currentApp.config.globalProperties.$awn) {
                currentApp.config.globalProperties.$awn.warning('API returns undefined data!');
            }
        }

        exoEventBus.$emit('exo-api-call:' + response.config.url.replace('/api/', ''), data)
        return data;
    }

    handleError(error) {
        if (error.message === 'CANCEL') throw error;

        let me = this
        return new Promise(function (resolve, reject) {
            if (me.progress) {
                me.progress = false;
                if (me.timer) {
                    clearTimeout(me.timer);
                    me.timer = 0;
                }
                if (currentApp && currentApp.config.globalProperties.$Progress) {
                    currentApp.config.globalProperties.$Progress.fail()
                }
            }
            if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
                //if you ever get an unauthorized, logout the admin
                store.dispatch('auth/logout')
                // you can also redirect to /login if needed !
                const currentRoute = currentRouter ? currentRouter.currentRoute.value : null;
                if (currentRoute && currentRoute.name !== R_LOGIN) {
                    if (currentRouter) {
                        currentRouter.push({name: R_LOGIN, params: {redir: currentRoute.path}});
                    }
                }
            }
            if (!error.config.preventShowError) {
                catchApiError(error);
            }

            throw error;
        });
    }

    checkProgress() {
        let me = this
        me.timer = setTimeout(function () {
            if (me.progress) {
                if (currentApp && currentApp.config.globalProperties.$Progress) {
                    currentApp.config.globalProperties.$Progress.set(10)
                }
                me.checkProgress()
            }
        }, 6000)
    }
}

export default new Api().service;

export function catchApiError(err) {
    if (currentApp && currentApp.config.globalProperties.$awn) {
        currentApp.config.globalProperties.$awn.alert(extractError(err));
    }
}

export function extractError(err) {
    if (get(err, 'response.status', 422)) {
        return extractValidationError(err)
    }
    let message = get(err, 'response.data.message') || err.message || 'Error!'
    let errors = get(err, 'response.data.errors', {})
    Object.keys(errors).forEach(key => {
        message = message + '<br>' + errors[key]
    })
    return message
}

export function extractValidationError(err) {
    let message = ''
    let errors = get(err, 'response.data.errors', {})
    Object.keys(errors).forEach(key => {
        message += errors[key]
    })
    if (isEmpty(message)) message = get(err, 'response.data.message') || err.message || 'Error!'
    return message
}
