import {ifAuthenticated} from '@/router/helpers'
import {R_DASHBOARD} from '@/router/routs'

export default {
    path: 'dashboard',
    name: R_DASHBOARD,
    beforeEnter: ifAuthenticated,
    component: () => import('@/views/dashboard/Dashboard'),
    meta: {
        label: 'Dashboard',
    }
}
