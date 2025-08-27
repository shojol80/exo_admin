import {ifAuthenticated, ifNotAuthenticated} from '@/router/helpers'
import {R_CHANGE_PASSWORD, R_LOGIN, R_SETUP_2FA} from '@/router/routs'

const SimpleContainer = () => import('@/components/containers/SimpleContainer')

// Views - Misc
const Page404 = () => import('@/views/misc/Page404')
const Page500 = () => import('@/views/misc/Page500')
const Login = () => import('@/views/misc/Login')
const Register = () => import('@/views/misc/Register')
const Setup2fa = () => import('@/views/misc/Setup2fa')
const ChangePassword = () => import('@/views/misc/ChangePassword')

export default {
    path: '/p',
    redirect: '/p/404',
    name: 'Pages',
    component: SimpleContainer,
    children: [
        {
            path: '404',
            name: 'Page404',
            component: Page404
        },
        {
            path: '500',
            name: 'Page500',
            component: Page500
        },
        {
            path: 'register',
            name: 'Register',
            component: Register,
            meta: {
                label: 'Register'
            }
        },
        {
            path: 'login',
            name: R_LOGIN,
            component: Login,
            beforeEnter: ifNotAuthenticated,
            meta: {
                label: 'Sign in'
            }
        },
        {
            path: '2fa',
            name: R_SETUP_2FA,
            component: Setup2fa,
            beforeEnter: ifAuthenticated
        },
        {
            path: 'change-password',
            name: R_CHANGE_PASSWORD,
            component: ChangePassword,
            meta: {
                label: 'Change password'
            }
        },
    ]
}
