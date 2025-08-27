import {ifAuthenticated} from '@/router/helpers'
import {R_FILES} from '@/router/routs'

const KeepAliveRouter = () => import('@/components/containers/KeepAliveRouter')
const Files = () => import('@/views/files/Files')


export default {
    path: 'files',
    redirect: '/',
    component: KeepAliveRouter,
    children: [
        {
            path: ':mode?',
            name: R_FILES,
            beforeEnter: ifAuthenticated,
            props: (route) => (Object.assign({}, {
                startDisk: route.query.startDisk || null,
                startFolder: route.query.startFolder || null,
                startSelection: route.query.startSelection || null,
                folderBack: route.query.folderBack || null,
            }, route.params)),
            component: Files,
            meta: {
                label: 'File Manager'
            }
        }
    ]
}
