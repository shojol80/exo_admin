import {ifAuthenticated} from '@/router/helpers'
import {R_MAINTENANCE} from '@/router/routs'

export default {
    path: 'maintenance',
    name: R_MAINTENANCE,
    beforeEnter: ifAuthenticated,
    props: true,
    component: () => import('@/views/maintenance/Maintenance'),
    meta: {
        label: 'Maintenance',
    }
}
