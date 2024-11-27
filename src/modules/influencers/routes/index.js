import {lazy} from "react"

export const Routes = [
    {
        path: "/genres/list",
        component: lazy(() => import("../views/genres-list")),
        meta: {
            action: "call",
            resource: "INFLUENCER_VIEW_GENRES"
        }
    },
    {
        path: "/interests/list",
        component: lazy(() => import("../views/interests-list")),
        meta: {
            action: "call",
            resource: "INFLUENCER_VIEW_INTERESTS"
        }
    },
    {
        path: "/userTypes/list",
        component: lazy(() => import("../views/user-types-list")),
        meta: {
            action: "call",
            resource: "INFLUENCER_VIEW_USER_TYPES"
        }
    },
    {
        path: "/users/list",
        component: lazy(() => import("../views/users-list")),
        meta: {
            action: "call",
            resource: "INFLUENCER_VIEW_USERS"
        }
    },
    {
        path: "/users/:userId",
        component: lazy(() => import("../views/user-profile")),
        meta: {
            action: "call",
            resource: "INFLUENCER_VIEW_USER_PROFILE"
        }
    },
    {
        path: "/tiers/list",
        component: lazy(() => import("../views/tiers-list")),
        meta: {
            action: "call",
            resource: "INFLUENCER_VIEW_TIERS"
        }
    },
    {
        path: "/campaigns/list",
        component: lazy(() => import("../views/campaigns-list")),
        meta: {
            action: "call",
            resource: "INFLUENCER_VIEW_CAMPAIGNS"
        }
    },
    {
        path: "/campaigns/:campaignId",
        component: lazy(() => import("../views/campaign-view")),
        meta: {
            action: "call",
            resource: "INFLUENCER_VIEW_CAMPAIGN_PROFILE"
        }
    },
    {
        path: "/invoices/list",
        component: lazy(() => import("../views/invoices-list")),
        meta: {
            action: "call",
            resource: "INFLUENCER_VIEW_INVOICES"
        }
    },
    {
        path: "/invoices/:id",
        component: lazy(() => import("../views/invoices-view")),
        meta: {
            action: "call",
            resource: "INFLUENCER_VIEW_INVOICE_PROFILE"
        }
    },
    {
        path: "/payouts/list",
        component: lazy(() => import("../views/payouts-list")),
        meta: {
            action: "call",
            resource: "INFLUENCER_VIEW_PAYOUTS"
        }
    },
    {
        path: "/payouts/:id",
        component: lazy(() => import("../views/payouts-view")),
        meta: {
            action: "call",
            resource: "INFLUENCER_VIEW_PAYOUT_PROFILE"
        }
    },
    {
        path: "/spotify/callback/:accessToken",
        component: lazy(() => import("../views/spotify-callback")),
        meta: {
            publicRoute: true
        }
    },
    {
        path: "/reports",
        component: lazy(() => import("../views/reports")),
        meta: {
            action: "call",
            resource: "INFLUENCER_VIEW_REPORTS"
        }
    },    
    {
        path: "/notifications",
        component: lazy(() => import("../views/notifications")),
        meta: {
            action: "call",
            resource: "INFLUENCER_VIEW_NOTIFICATIONS"
        }
    }
]
