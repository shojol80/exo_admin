<template>
    <div class="app">
        <AppHeader fixed>
            <SidebarToggler class="d-lg-none" display="md" mobile/>
            <b-link class="navbar-brand" to="#">
                <img class="navbar-brand-full" src="/exo_admin/img/brand/logo.png" height="30" alt="ExologCMS">
                <img class="navbar-brand-minimized" src="/exo_admin/img/brand/logo_mini.png" height="30" alt="ExologCMS">
            </b-link>
            <SidebarToggler class="d-md-down-none" display="lg"/>
            <Breadcrumb/>
            <h4 class="mx-auto">
                <b-badge pill variant="danger" v-text=""></b-badge>
            </h4>
            <edition-opener class="mr-1"></edition-opener>
            <b-navbar-nav class="mr-4">
                <DefaultHeaderDropdownAccnt></DefaultHeaderDropdownAccnt>
            </b-navbar-nav>
        </AppHeader>
        <div class="app-body">
            <AppSidebar fixed>
                <SidebarHeader/>
                <SidebarForm/>
                <SidebarNav :navItems="nav"></SidebarNav>
                <SidebarFooter/>
                <SidebarMinimizer/>
            </AppSidebar>
            <main class="main">
                <slot></slot>
            </main>
        </div>
    </div>
</template>

<script>
import nav from '@/_nav'
import AppHeader from './Header'
import {Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, SidebarToggler} from './Sidebar'
import Breadcrumb from '@/components/Breadcrumb'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import EditionOpener from './EditionOpener'

export default {
    name: 'AppSidebarContainer',
    components: {
        AppHeader,
        AppSidebar,
        Breadcrumb,
        EditionOpener,
        DefaultHeaderDropdownAccnt,
        SidebarForm,
        SidebarFooter,
        SidebarToggler,
        SidebarHeader,
        SidebarNav,
        SidebarMinimizer
    },
    data() {
        return {
            nav: nav.items
        }
    },
}
</script>
<style lang="scss">
.header-fixed .app-header {
    z-index: 1021
}
</style>
