import {ifAuthenticated} from '@/router/helpers'
import {R_REACT_LAYOUT} from '@/router/routs'

const KeepAliveRouter = () => import('@/components/containers/KeepAliveRouter')
const ReactLayoutView = () => import('@/views/layout/ReactLayoutView')

export default {
    path: 'layout',
    redirect: '/',
    component: KeepAliveRouter,
    children: [
        {
            path: ':layout/',
            props: true,
            name: R_REACT_LAYOUT,
            beforeEnter: ifAuthenticated,
            component: ReactLayoutView,
            meta: {
                label: 'Page layout',
                keepAlive: false
            },
            /*children: [
                {
                    path: 'select',
                    props: true,
                    name: R_CONTROLLER_ADD_ITEMS,
                    beforeEnter: ifAuthenticated,
                    component: ControllerAddItem,
                    meta: {
                        label: 'Select items',
                    }
                },
                {
                    path: 'settings',
                    props: true,
                    name: R_CONTROLLER_SETTINGS,
                    beforeEnter: ifAuthenticated,
                    component: ControllerSettings,
                    meta: {
                        label: 'Settings for group',
                    }
                },
                {
                    path: 'grid',
                    props: true,
                    name: R_CONTROLLER_GRID_SETUP,
                    beforeEnter: ifAuthenticated,
                    component: ControllerGridSetup,
                    meta: {
                        label: 'Grid setup',
                    }
                },
                {
                    path: 'actions/:react_id',
                    props: true,
                    name: R_CONTROLLER_ACTIONS,
                    beforeEnter: ifAuthenticated,
                    component: ControllerFormActions,
                    meta: {
                        label: 'Actions',
                    }
                },
                {
                    path: 'edit/:react_id',
                    props: true,
                    name: R_CONTROLLER_EDIT_ITEM,
                    beforeEnter: ifAuthenticated,
                    component: ControllerEditItem,
                    meta: {
                        label: 'Edit reaction'
                    }
                }
            ]*/
        },


    ]
}
