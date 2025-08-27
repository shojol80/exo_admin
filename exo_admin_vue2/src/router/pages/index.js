import {ifAuthenticated} from '@/router/helpers'
import {R_EDITION_EDIT, R_EDITION_TABLE, R_SITE_EDIT} from '@/router/routs'

const KeepAliveRouter = () => import('@/components/containers/KeepAliveRouter')

//Pages
const Edition = () => import('@/views/pages/Edition')
const Pages = () => import('@/views/pages/Pages')
const Site = () => import('@/views/pages/Site')
const EditionTable = () => import('@/views/pages/EditionsTable')

export default [{
    path: '/editions',
    redirect: '/editions',
    component: KeepAliveRouter,
    meta: {
        label: 'Pages'
    },
    children: [
        {
            path: '',
            beforeEnter: ifAuthenticated,
            component: Pages,
            children: [
                {
                    path: '',
                    name: R_EDITION_TABLE,
                    props: true,
                    beforeEnter: ifAuthenticated,
                    component: EditionTable,
                    meta: {
                        hideTreeInPopup: true,
                        label: 'Editions'
                    }
                },
                {
                    path: 'site',
                    name: R_SITE_EDIT,
                    props: true,
                    beforeEnter: ifAuthenticated,
                    component: Site,
                    meta: {
                        hideTreeInPopup: true,
                        label: 'Site'
                    }
                },
                {
                    path: ':e_id',
                    name: R_EDITION_EDIT,
                    props: true,
                    beforeEnter: ifAuthenticated,
                    component: Edition,
                    meta: {
                        hideTreeInPopup: true,
                        label: 'Edition edit'
                    }
                },
            ]
        },
    ],
},
]
