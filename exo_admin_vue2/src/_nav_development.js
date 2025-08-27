export default {
    name: 'Development',
    icon: 'fas fa-user-secret',
    //title: true,
    //class: 'd-none',
    children: [
        {
            name:'Views',
            url: '/development/views',
            icon: 'fas fa-user-secret',
        },
        {
            name: 'Components',
            icon: 'fas fa-user-secret',
            url: '/development/components/',
        },

        {
            name: 'Colors',
            url: '/development/colors',
            icon: 'fas fa-user-secret',
        },
        {
            name: 'Typography',
            url: '/development/typography',
            icon: 'fas fa-user-secret',
        },
        {
            name: 'Buttons',
            url: '/development/buttons/standard-buttons',
            icon: 'fas fa-user-secret',
        },
        {
            name: 'Tabs',
            url: '/development/base/tabs',
            icon: 'fas fa-user-secret',
        },
        {
            name: 'Notifications',
            icon: 'fas fa-user-secret',
            children: [
                {
                    name: 'Alerts',
                    url: '/development/notifications/alerts',
                    icon: 'fas fa-user-secret',
                },
                {
                    name: 'Badges',
                    url: '/development/notifications/badges',
                    icon: 'fas fa-user-secret',
                },
                {
                    name: 'Modals',
                    url: '/development/notifications/modals',
                    icon: 'fas fa-user-secret',
                }
            ]
        },
    ]
}
