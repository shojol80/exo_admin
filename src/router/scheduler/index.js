import {ifAuthenticated} from '@/router/helpers'
import {R_SCHEDULE_EDIT, R_SCHEDULER_TABLE} from '@modules/routs'

const KeepAliveRouter = () => import('@/components/containers/KeepAliveRouter')

export default {
    path: 'scheduler',
    redirect: '/scheduler',
    component: KeepAliveRouter,
    meta: {
        label: 'Scheduler'
    },
    children: [
        {
            path: '',
            name: R_SCHEDULER_TABLE,
            props: true,
            beforeEnter: ifAuthenticated,
            component: () => import('@/views/scheduler/SchedulesTable.vue'),
            meta: {
                label: 'Schedule List',
                keepAlive: true
            },
        },
        {
            path: ':schedule_id',
            name: R_SCHEDULE_EDIT,
            props: true,
            beforeEnter: ifAuthenticated,
            component: () => import('@/views/scheduler/Schedule'),
            meta: {
                label: 'Edit schedule'
            }
        },
    ],
}
