import React from "react"
import {
    Bell,
    Briefcase,
    Shield,
    Home,
    Lock,
    User,
    Users,
    Play,
    Music,
    Codesandbox, CheckCircle
} from "react-feather"

import {trans} from '@utils'

export const Navigation = [
    {
        header: 'Scraping Tool'
    },
    {
        id: 'scrapingJops',
        title: trans('user.nav.scrapingJobs'),
        icon: <Play/>,
        navLink: '/scraping-jobs/lists',
        action: 'call',
        resource: 'SCRAPING_VIEW_PLAYLISTS'
    },
    {
        id: 'crm',
        title: 'Artists CRM',
        icon: <Users/>,
        navLink: '/crm/list',
        action: 'call',
        resource: 'SCRAPING_VIEW_CRM_LIST'
    },
    {
        header: 'Settings'
    },
    // {
    //     id: 'chat',
    //     title: 'Admins',
    //     icon: <Shield />,
    //     navLink: '/apps/demo'
    // },
    // {
    //     id: 'chat',
    //     title: 'Role & Permissions',
    //     icon: <Shield />,
    //     navLink: '/apps/demo'
    // },
    {
        id: 'log',
        title: 'Audit Logs',
        icon: <Lock />,
        navLink: '/logs',
        action: 'call',
        resource: 'LOG_LIST'
    },
    {
        id: '1',
        title: 'Genre List',
        icon: <Music />,
        navLink: '/genres/list'
    },
    // {
    //     id: '3',
    //     title: 'User Types',
    //     icon: <User />,
    //     navLink: '/userTypes/list'
    // },
    {
        id: '2',
        title: 'Interests List',
        icon: <CheckCircle />,
        navLink: '/interests/list'
    },
    {
        id: '4',
        title: 'Tiers List',
        icon: <Codesandbox />,
        navLink: '/tiers/list'
    }
]
