import React from "react"
import {Briefcase, FileText, Home, Shield, Users} from "react-feather"

import {trans} from '@utils'
import {Message} from "@material-ui/icons"

export const Navigation = [
	{
		id: 'dashboard',
		title: "Dashboard",
		icon: <Home size={20}/>,
		navLink: '/dashboard',
		action: 'call',
		resource: 'general'
	},
    {
    	header: 'Influencer Platform'
    },
    {
    	id: '5',
    	title: 'Users',
    	icon: <Users />,
    	navLink: '/users/list',
			action: 'call',
			resource: 'INFLUENCER_VIEW_USERS'
    },
    {
    	id: '6',
    	title: 'Campaigns',
    	icon: <Briefcase />,
    	navLink: '/campaigns/list',
			action: 'call',
			resource: 'INFLUENCER_VIEW_CAMPAIGNS'
    },
    {
    	id: '7',
    	title: 'Invoices',
    	icon: <FileText />,
    	navLink: '/invoices/list',
			action: 'call',
			resource: 'INFLUENCER_VIEW_INVOICES'
    },
    {
    	id: '8',
    	title: 'Payouts',
    	icon: <FileText />,
    	navLink: '/payouts/list',
			action: 'call',
			resource: 'INFLUENCER_VIEW_PAYOUTS'
    },
    {
    	id: '9',
    	title: 'Reports',
    	icon: <FileText />,
    	navLink: '/reports',
			action: 'call',
			resource: 'INFLUENCER_VIEW_REPORTS'
    },	
	{
		id: '10',
		title: 'Notifications',
		icon: <Message />,
		navLink: '/notifications',
		action: 'call',
		resource: 'INFLUENCER_VIEW_NOTIFICATIONS'
	}
]
