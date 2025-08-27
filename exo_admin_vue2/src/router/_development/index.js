import {ifAuthenticated} from '@/router/helpers'

const Colors = () => import('@/views/_development/theme/Colors')
const Typography = () => import('@/views/_development/theme/Typography')
const StandardButtons = () => import('@/views/_development/buttons/StandardButtons')

// Views - Notifications
const Alerts = () => import('@/views/_development/notifications/Alerts')
const Badges = () => import('@/views/_development/notifications/Badges')
const Modals = () => import('@/views/_development/notifications/Modals')

const Tabs = () => import('@/views/_development/base/Tabs')

//Views
const Views = () => import('@/views/_development/views/Views')


export default {
    path: 'development',
    redirect: '/development/colors',
    beforeEnter: ifAuthenticated,
    component: {
        render(c) {
            return c('router-view')
        }
    },
    meta: {
        label: 'Development'
    },
    children: [
        {
            path: 'components',
            name: 'Components',
            component: () => import('@/views/_development/components/Components'),
        },
        {
            path: 'views',
            name: 'Views',
            component: Views,
        },
        {
            path: 'colors',
            name: 'colors',
            component: Colors,
            meta: {
                label: 'Colors'
            }
        },
        {
            path: 'typography',
            props: true,
            name: 'typography',
            meta: {
                label: 'Typography'
            },
            component: Typography,
        },
        {
            path: 'buttons/standard-buttons',
            props: true,
            name: 'standard-buttons',
            meta: {
                label: 'Buttons'
            },
            component: StandardButtons,
        },
        {
            path: 'base/tabs',
            props: true,
            name: 'tabs',
            meta: {
                label: 'Tabs'
            },
            component: Tabs,
        },
        {
            path: 'notifications',
            redirect: '/development/notifications/alerts',
            name: 'Notifications',
            component: {
                render(c) {
                    return c('router-view')
                }
            },
            children: [
                {
                    path: 'alerts',
                    name: 'Alerts',
                    component: Alerts
                },
                {
                    path: 'badges',
                    name: 'Badges',
                    component: Badges
                },
                {
                    path: 'modals',
                    name: 'Modals',
                    component: Modals
                }
            ]
        },

    ],
}
