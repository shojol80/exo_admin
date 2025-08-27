import {ClientTable, ServerTable} from 'vue-tables-2'
import {vueTableConfig, vueTableTheme} from './configs'

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
    install(Vue, options = {}) {
        /**
         * Makes sure that plugin can be installed only once
         */
        if (this.installed) {
            return
        }

        this.installed = true

        const xComponents = {
            dataTable: XDataTable,
            perPageSelector: XPerPageSelector,
            //dropdownPagination: XDropdownPagination,
            pagination: XPagination,
            tableRow: XTableRow,
            tableBody: XTableBody,
            tableHead: XTableHead,
            //headingsRow: XHeadingsRow,
            //tableHeading: XTableHeading
            textFilter: XTextFilter,
            //filtersRow: XFiltersRow,
            genericFilter: XGenericFilter,
        }
        Vue.use(ServerTable, vueTableConfig, false, vueTableTheme, xComponents)

        Vue.use(ClientTable, vueTableConfig, false, vueTableTheme, xComponents);
    }
}

export default Plugin
