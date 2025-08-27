import {ifAuthenticated} from '@/router/helpers'
import {R_REACT_EDIT, R_REACT_SEND, R_REACTS_TABLE} from '@/router/routs'

const KeepAliveRouter = () => import('@/components/containers/KeepAliveRouter')

const ReactsTable = () => import('@/views/reacts/ReactsTable')
const React = () => import('@/views/reacts/React')
const ReactSendMailable = () => import('@/views/reacts/ReactSendMailable')


export default {
    path: 'reacts',
    redirect: '/',
    component: KeepAliveRouter,
    children: [
        {
            path: '',
            props: true,
            name: R_REACTS_TABLE,
            beforeEnter: ifAuthenticated,
            component: ReactsTable,
            meta: {
                label: 'Reactions',
                keepAlive: true,
            }
        },
        {
            path: ':react_id/send',
            props: true,
            name: R_REACT_SEND,
            beforeEnter: ifAuthenticated,
            component: ReactSendMailable,
            meta: {
                label: 'Send mail'
            }
        },
        {
            path: ':react_id',
            props: true,
            name: R_REACT_EDIT,
            beforeEnter: ifAuthenticated,
            component: React,
            meta: {
                label: 'Edit reaction'
            }
        }
    ]
}
