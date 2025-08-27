import {ifAuthenticated} from '@/router/helpers'
import {R_SITES_TABLE} from '@/router/routs'

const KeepAliveRouter = () => import('@/components/containers/KeepAliveRouter')
const SitesTable = () => import('@/views/sites/SitesTable')

export default {
    path: 'sites',
    redirect: '/sites',
    component: KeepAliveRouter,
    meta: {
        label: 'Sites'
    },
    children: [
        {
            path: '',
            name: R_SITES_TABLE,
            props: true,
            beforeEnter: ifAuthenticated,
            component: SitesTable,
            meta: {
                label: 'All',
                keepAlive: true
            }
        },

    ],
}
