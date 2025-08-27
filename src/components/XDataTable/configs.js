export const vueTableConfig = {
    perPage: 100,
    perPageValues: [10, 100, 200],
    sortIcon: {
        base: 'fas',
        up:
            'fa-sort-up',
        down:
            'fa-sort-down',
        is:
            'fa-sort'
    },
    texts: {
        count: '{from} - {to} of {count}'
    },
    prevIcon: 'fas fa-angle-left',
    nextIcon: 'fas fa-angle-right',
    pagination: {dropdown: true}
}
export const vueTableTheme = function () {
    return {
        framework: 'bootstrap4Exo',
        table: 'table table-striped table-bordered table-hover',
        row: 'row',
        column: 'col-md-12 d-flex',
        label: '',
        input: 'form-control',
        select: 'form-control',
        field: 'form-group',
        inline: 'form-inline',
        right: 'mr-auto',
        left: 'ml-auto',
        center: 'text-center',
        contentCenter: 'justify-content-center',
        nomargin: 'm-0',
        groupTr: 'table-info',
        small: '',
        button: 'btn btn-secondary',
        dropdown: {
            container: 'dropdown',
            trigger: 'dropdown-toggle',
            menu: 'dropdown-menu',
            content: '',
            item: 'dropdown-item',
            caret: 'caret'
        },
        pagination: {
            nav: '',
            count: '',
            wrapper: '',
            list: 'pagination',
            item: 'page-item',
            link: 'page-link',
            next: '',
            prev: '',
            active: 'active',
            disabled: 'disabled'
        },
        btnPrimary: 'action-button'
    }
}
