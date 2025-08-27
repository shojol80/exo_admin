import {ifAuthenticated} from '@/router/helpers'
import {R_RESOURCES} from '@/router/routs'

const KeepAliveRouter = () => import('@/components/containers/KeepAliveRouter')
const Resources = () => import('@/views/resources/Resources')


export default {
    path: 'resources',
    redirect: '/',
    component: KeepAliveRouter,
    children: [
        {
            path: '',
            name: R_RESOURCES,
            beforeEnter: ifAuthenticated,
            props: true,
            component: Resources,
            meta: {
                keepAlive: true,
                label: 'Resource Manager'
            }
        }
    ]
}
