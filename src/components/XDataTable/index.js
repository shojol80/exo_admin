import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'

import XDataTable from './components/XDataTable'
import XPagination from './components/XPagination'
import XTableRow from './components/XTableRow'
import XTableBody from './components/XTableBody'
import XPerPageSelector from './components/XPerPageSelector'
import XTableHead from './components/XTableHead'
import XTextFilter from './components/XTextFilter'
import XFiltersRow from './components/XFiltersRow'
import XGenericFilter from './components/XGenericFilter'

const Plugin = {
    install(app, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return
        }

        this.installed = true

        // Register Vue 3 Easy Data Table
        app.component('EasyDataTable', Vue3EasyDataTable)

        // Register custom components
        app.component('XDataTable', XDataTable)
        app.component('XPagination', XPagination)
        app.component('XTableRow', XTableRow)
        app.component('XTableBody', XTableBody)
        app.component('XPerPageSelector', XPerPageSelector)
        app.component('XTableHead', XTableHead)
        app.component('XTextFilter', XTextFilter)
        app.component('XFiltersRow', XFiltersRow)
        app.component('XGenericFilter', XGenericFilter)
    }
}

export default Plugin
