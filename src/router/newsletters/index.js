import {ifAuthenticated} from '@/router/helpers'
import {R_NEWSLETTERS} from '@modules/routs'

const KeepAliveRouter = () => import('@/components/containers/KeepAliveRouter')

export default {
    path: 'newsletters',
    redirect: '/newsletters',
    component: KeepAliveRouter,
    meta: {
        label: 'Newsletters'
    },
    children: [
        {
            path: '',
            name: R_NEWSLETTERS,
            props: true,
            beforeEnter: ifAuthenticated,
            component: () => import('@/views/newsletters/NewslettersTable'),
            meta: {
                label: 'All',
                keepAlive: true
            }
        },
    ],
}
