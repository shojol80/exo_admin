import {ifAuthenticated} from '@/router/helpers'
import {R_FORM_EDIT, R_FORMGROUP_EDIT, R_FORMS, R_FORMS_TABLE} from '@/router/routs'

const KeepAliveRouter = () => import('@/components/containers/KeepAliveRouter')

//Forms
const Forms = () => import('@/views/forms/Forms')
const FormsTable = () => import('@/views/forms/FormsTable')
const Formgroup = () => import('@/views/forms/Formgroup')
const Form = () => import('@/views/forms/Form')

export default {
    path: '/formgroup',
    component: KeepAliveRouter,
    meta: {
        label: 'Forms'
    },
    children: [
        {
            path: '',
            redirect: '/formgroup/0/forms',
            props: true,
            name: R_FORMS,
            beforeEnter: ifAuthenticated,
            component: Forms,
            children: [
                {
                    path: ':group_id',
                    props: true,
                    name: R_FORMGROUP_EDIT,
                    beforeEnter: ifAuthenticated,
                    component: Formgroup,
                    meta: {
                        hideTreeInPopup: true,
                        label: 'Edit formgroup'
                    }
                },
                {
                    path: ':group_id/forms',
                    props: true,
                    name: R_FORMS_TABLE,
                    beforeEnter: ifAuthenticated,
                    component: FormsTable,
                    meta: {
                        label: 'ALL',
                        back_anchor: true,
                    }
                },
                {
                    path: ':group_id/forms/:form_id',
                    props: true,
                    name: R_FORM_EDIT,
                    beforeEnter: ifAuthenticated,
                    component: Form,
                    meta: {
                        hideTreeInPopup: true,
                        label: 'Edit form'
                    }
                },
            ],
        },
    ],
}
