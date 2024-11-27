import React from "react"
import {Bell, Briefcase, Shield, Home, Lock, Settings, User, Users, UserCheck, Play} from "react-feather"

export const Navigation = [
    {
        id: 'adminList',
        title: 'Admins',
        icon: <Lock/>,
        navLink: '/admin/list',
        action: 'call',
        resource: 'ADMINS_VIEW_LIST'
    }
    // {
    //     id: 'scrapingJops',
    //     title: 'user.nav.scrapingJobs',
    //     icon: <Play/>,
    //     navLink: '/scraping-jobs/list',
    //     action: 'call',
    //     resource: 'SCRAPING_JOBS_VIEW_LIST'
    // }
    // {
    //   id: 'Notifications',
    //   title: 'user.nav.notifications',
    //   icon: <Bell />,
    //   navLink: '/notifications/list',
    //   action: 'call',
    //   resource: 'NOTIFICATIONS_VIEW_LIST'
    // },
]
