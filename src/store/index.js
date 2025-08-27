import { createStore } from 'vuex'
import auth from './auth'
import app from './app'
import form from './form'
import breadcrumb from './breadcrumb'
import site from './site'
import exolog from './exolog'
import usergroups from './usergroups'
import ECO from './ECO'
import forms from './forms'
import pages from './pages'
import resources from './resources'
import fm from '@/components/FileManager/store'
import reactForm from '@/components/ReactForm/store'
import controller from '@/components/Controller/store'
import rl from '@/components/ReactLayout/store'

const debug = import.meta.env.MODE !== 'production'
const store = createStore({
    modules: {
        auth,
        app,
        form,
        breadcrumb,
        site,
        exolog,
        usergroups,
        ECO,
        forms,
        pages,
        fm,
        reactForm,
        controller,
        resources,
        rl,
    },
    strict: debug,
});

export default store
