import {ifAuthenticated} from '@/router/helpers'
import {R_SEARCH, R_SEARCH_CONTROLLER, R_SEARCH_CONTROLLER_SETTINGS, R_SEARCH_SETTINGS} from '@/router/routs'

//Search Controller
const SearchController = () => import('@/views/search/SearchController')
const SearchControllerSettings = () => import('@/views/search/SearchControllerSettings')
const SearchSettings = () => import('@/views/search/SearchSettings')
const Search = () => import('@/views/search/Search')

export default {
    path: 'search',
    redirect: '/',
    component: {
        render(c) {
            return c('router-view')
        }
    },
    children: [
        {
            path: 'exedit/:exedit',
            props: true,
            name: R_SEARCH,
            beforeEnter: ifAuthenticated,
            component: Search,
            meta: {
                label: 'Search',
            }
        },
        {
            path: 'exedit/:exedit/settings',
            props: true,
            name: R_SEARCH_SETTINGS,
            beforeEnter: ifAuthenticated,
            component: SearchSettings,
            meta: {
                label: 'Search setup',
            }
        },
        {
            path: ':react_id',
            props: true,
            name: R_SEARCH_CONTROLLER,
            beforeEnter: ifAuthenticated,
            component: SearchController,
            meta: {
                label: 'Search'
            }
        },
        {
            path: ':react_id/settings',
            props: true,
            name: R_SEARCH_CONTROLLER_SETTINGS,
            beforeEnter: ifAuthenticated,
            component: SearchControllerSettings,
            meta: {
                label: 'Search setup',
                defaultRouteBack: R_SEARCH_CONTROLLER
            }
        }
    ]
}
