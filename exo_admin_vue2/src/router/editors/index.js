import {R_CODE_EDITOR, R_BTNSETTINGS, R_TINYMCE_STYLES} from '@/router/routs'
import {ifAuthenticated} from "@/router/helpers";

const KeepAliveRouter = () => import('@/components/containers/KeepAliveRouter')
const CodeEditor = () => import('@/views/editors/CodeEditor')
const BtnSettings = () => import('@/views/editors/BtnSettings')
const TinyMceStyles = () => import('@/views/editors/TinyMceStyles')

export default {
    path: 'editors',
    redirect: '/editors/code',
    component: KeepAliveRouter,
    children: [
        {
            path: 'code',
            name: R_CODE_EDITOR,
            props: true,
            component: CodeEditor,
            meta: {
                label: 'Source code'
            }
        },
        {
            path: 'btnsettings',
            name: R_BTNSETTINGS,
            props: true,
            component: BtnSettings,
            meta: {
                label: 'Setup toolbar buttons'
            }
        },
        {
            path: 'tinymce-styles',
            name: R_TINYMCE_STYLES,
            props: true,
            component: TinyMceStyles,
            beforeEnter: ifAuthenticated,
            meta: {
                label: 'Setup styles'
            }
        },
    ]
}
