import { createRouter, createWebHistory } from 'vue-router'
//Routes
import _development from '@/router/_development'
import dashboard from '@/router/dashboard'
import users from '@/router/users'
import pages from '@/router/pages'
import forms from '@/router/forms'
import reacts from '@/router/reacts'
import search from '@/router/search'
import misc from '@/router/misc'
import editors from '@/router/editors'
import domains from '@/router/domains'
import sites from '@/router/sites'
import newsletters from '@/router/newsletters'
import files from '@/router/files'
import controller from '@/router/controller'
import splash from '@/router/splash'
import maintenance from '@/router/maintenance'
import sitemap from '@/router/sitemap'
import layout from '@/router/layout'

import scheduler from "@/router/scheduler";

// Store will be set dynamically to avoid circular dependencies
let currentStore = null;
export function setCurrentStore(store) {
    currentStore = store;
}

// Containers
const AppContainer = () => import('@/components/containers/AppContainer')

const router = createRouter({
    history: createWebHistory('/exo_admin/'),
    linkActiveClass: 'open active',
    scrollBehavior: () => ({top: 0}),
    routes: [
        {
            path: '/',
            redirect: '/dashboard',
            name: 'Home',
            component: AppContainer,
            //beforeEnter: ifAuthenticated,
            props: (route) => ({mode: route.query.mode}),
            children: [
                dashboard,
                forms,
                reacts,
                search,
                ...pages,
                users,
                editors,
                domains,
                sites,
                newsletters,
                files,
                controller,
                scheduler,
                maintenance,
                sitemap,
                layout,
                _development,
                {
                    name: 'R_BRIDGE',
                    path: 'bridge',
                    component: {
                        render(c) {
                            return c('div')
                        }
                    },
                    meta: {
                        label: 'Loading...'
                    },
                }
            ]
        },
        splash,
        misc,
    ]
})


router.afterEach((to, from) => {
    if (currentStore) {
        currentStore.dispatch('breadcrumb/setByRoute', to)
    }
})

export default router;

