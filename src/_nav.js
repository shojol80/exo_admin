import _development from './_nav_development'

let nav = {
    items: [
        {
            name: 'Dashboard',
            url: '/dashboard',
            icon: 'fas fa-tachometer-alt',
        },
        {
            title: true,
            name: 'Settings',
            class: '',
            wrapper: {
                element: '',
                attributes: {}
            }
        },
        {
            name: 'Editions',
            url: '/editions',
            icon: 'edition'
        },
        {
            name: 'Forms',
            url: '/formgroup',
            icon: 'form',
        },
        {
            name: 'Reactions',
            url: '/reacts',
            icon: 'react',
        },
        {
            name: 'Users',
            url: '/usergroup',
            icon: 'users'
        },
        {
            name: 'Files',
            url: '/files',
            icon: 'files'
        },
        {
            name: 'Domains',
            url: '/domains',
            icon: 'fas fa-globe'
        },
        {
            name: 'Sites',
            url: '/sites',
            icon: 'fas fa-server'
        },
        {
            name: 'Newsletters',
            url: '/newsletters',
            icon: 'fas fa-newspaper'
        },
        {
            name: 'Sitemap',
            url: '/sitemap',
            icon: 'fas fa-sitemap'
        },
        {
            name: 'Scheduler',
            url: '/scheduler',
            icon: 'far fa-clock'
        },
        {
            name: 'Maintenance',
            url: '/maintenance',
            icon: 'fas fa-tools',
            role: 'developer'
        },

    ]
}

nav.items.push(
    {
        name: 'Links',
        title: true,
        class: 'mt-auto',
        children: []
    },
    {
        icon: 'far fa-star',
        name: 'Dealer',
        url: 'https://dealer.exolog.net/',
    })

if (process.env.VUE_APP_THEME) {
    nav.items.push(_development)
}
export default nav
