import {ifAuthenticated} from '@/router/helpers'
import {R_SITEMAP_TABLE, R_SITEMAP} from '@/router/routs'

const KeepAliveRouter = () => import('@/components/containers/KeepAliveRouter')

//Pages
const Sitemap = () => import('@/views/sitemap/Sitemap')
const SitemapTable = () => import('@/views/sitemap/SitemapTable')

export default {
    path: '/sitemap',
    redirect: '/sitemap',
    component: KeepAliveRouter,
    meta: {
        label: 'Sitemap'
    },
    children: [
        {
            path: '',
            name: R_SITEMAP,
            beforeEnter: ifAuthenticated,
            component: Sitemap,
            children: [
                {
                    path: ':e_id?',
                    name: R_SITEMAP_TABLE,
                    props: true,
                    beforeEnter: ifAuthenticated,
                    component: SitemapTable,
                    meta: {
                        keepAlive: true,
                        label: 'All',
                    }
                },
            ]
        },
    ],
}

