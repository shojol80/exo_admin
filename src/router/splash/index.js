import {R_APP_INIT} from '@/router/routs'

const KeepAliveRouter = () => import('@/components/containers/KeepAliveRouter')

export default {
    path: '/loading',
    redirect: '/loading',
    component: KeepAliveRouter,
    children: [
        {
            path: '',
            name: R_APP_INIT,
            props: true,
            component: () => import('@/views/splash/AppInit'),
            meta: {
                label: 'Loading'
            }
        },
    ]
}
