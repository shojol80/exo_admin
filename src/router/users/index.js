import {ifAuthenticated} from '@/router/helpers'
import {R_USER_EDIT, R_USERGROUP_EDIT, R_USERS, R_USERS_TABLE} from '@/router/routs'

const KeepAliveRouter = () => import('@/components/containers/KeepAliveRouter')
// Views - Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')
const Usergroup = () => import('@/views/users/Usergroup')
const UsersTable = () => import('@/views/users/UsersTable')


export default {
    path: '/usergroup',
    component: KeepAliveRouter,
    meta: {
        label: 'Users'
    },
    children: [
        {
            path: '',
            redirect: '/usergroup/0/users',
            props: true,
            name: R_USERS,
            beforeEnter: ifAuthenticated,
            component: Users,
            children: [
                {
                    path: ':ug_id/users',
                    props: true,
                    name: R_USERS_TABLE,
                    beforeEnter: ifAuthenticated,
                    component: UsersTable,
                    meta: {
                        label: 'ALL',
                        keepAlive: true
                    }
                },
                {
                    path: ':ug_id/users/:u_id',
                    props: true,
                    name: R_USER_EDIT,
                    beforeEnter: ifAuthenticated,
                    component: User,
                    meta: {
                        hideTreeInPopup:true,
                        label: 'Edit user'
                    }
                },
                {
                    path: ':ug_id',
                    props: true,
                    name: R_USERGROUP_EDIT,
                    beforeEnter: ifAuthenticated,
                    component: Usergroup,
                    meta: {
                        hideTreeInPopup:true,
                        label: 'Edit usergroup'
                    }
                },
            ],
        },
    ],
}
