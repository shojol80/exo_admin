import {ifAuthenticated} from '@/router/helpers'
import {
    R_CONTROLLER,
    R_CONTROLLER_ACTIONS,
    R_CONTROLLER_ADD_ITEMS,
    R_CONTROLLER_COMMON_SETTINGS,
    R_CONTROLLER_EDIT_ITEM,
    R_CONTROLLER_SETTINGS
} from '@/router/routs'

const KeepAliveRouter = () => import('@/components/containers/KeepAliveRouter')
const ControllerView = () => import('@/views/controller/ControllerView')
const ControllerSettings = () => import('@/components/Controller/ControllerSettings')
const ControllerCommonSettings = () => import('@/components/Controller/ControllerCommonSettings')
const ControllerAddItem = () => import('@/components/Controller/ControllerAddItem')
const ControllerEditItem = () => import('@/components/Controller/ControllerEditItem')
const ControllerFormActions = () => import('@/components/Controller/ControllerFormActions')

export default {
    path: 'controller',
    redirect: '/',
    component: KeepAliveRouter,
    children: [
        {
            path: 'common-settings',
            props: true,
            name: R_CONTROLLER_COMMON_SETTINGS,
            beforeEnter: ifAuthenticated,
            component: ControllerCommonSettings,
            meta: {
                label: 'Settings for group',
                keepAlive: false
            },

        },
        {
            path: ':container/',
            props: true,
            name: R_CONTROLLER,
            beforeEnter: ifAuthenticated,
            component: ControllerView,
            meta: {
                label: 'Items in group',
                keepAlive: true
            },
            children: [
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
            ]
        },


    ]
}
