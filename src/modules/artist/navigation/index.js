import React from "react"
import {Bell, Briefcase, Shield, Home, Lock, Settings, User, Users, UserCheck, Play, FileText} from "react-feather"

export const Navigation = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        icon: <Home size={20}/>,
        navLink: '/dashboard',
        action: 'call',
        resource: 'ARTIST_ALL_PERMISSION'
    },
    {
        id: 'security',
        title: 'Security',
        icon: <Lock size={20}/>,
        navLink: '/security',
        action: 'call',
        resource: 'ARTIST_ALL_PERMISSION'
    },
    {
        id: 'campaigns',
        title: 'Campaigns',
        icon: <Briefcase size={20}/>,
        navLink: '/campaigns/list',
        action: 'call',
        resource: 'ARTIST_ALL_PERMISSION'
    },
    {
        id: 'my-campaigns',
        title: 'My Campaigns',
        icon: <Briefcase size={20}/>,
        navLink: '/my-campaigns',
        action: 'call',
        resource: 'CURATOR_PERMISSION'
    },
    {
        id: 'invoices',
        title: 'Invoices',
        icon: <FileText size={20}/>,
        navLink: '/invoices/list',
        action: 'call',
        resource: 'ARTIST_PERMISSION'
    },
    {
        id: 'payouts',
        title: 'Payouts',
        icon: <FileText size={20}/>,
        navLink: '/payouts/list',
        action: 'call',
        resource: 'CURATOR_PERMISSION'
    },
    // {
    //     id: 'connections',
    //     title: 'Connections',
    //     icon: <Home size={20}/>,
    //     navLink: '/connections',
    //     action: 'call',
    //     resource: 'ARTIST_ALL_PERMISSION'
    // },
    {
        id: 'account',
        title: 'Account',
        icon: <User size={20}/>,
        navLink: '/account',
        action: 'call',
        resource: 'ARTIST_ALL_PERMISSION'
    }
]
