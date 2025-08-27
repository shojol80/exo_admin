import {ifAuthenticated} from '@/router/helpers'
import {R_DOMAINS_TABLE} from '@/router/routs'

const KeepAliveRouter = () => import('@/components/containers/KeepAliveRouter')
const DomainsTable = () => import('@/views/domains/DomainsTable')

export default {
    path: 'domains',
    redirect: '/domains',
    component: KeepAliveRouter,
    meta: {
        label: 'Domains'
    },
    children: [
        {
            path: '',
            name: R_DOMAINS_TABLE,
            props: true,
            beforeEnter: ifAuthenticated,
            component: DomainsTable,
            meta: {
                label: 'All',
                keepAlive: true
            }
        },

    ],
}
