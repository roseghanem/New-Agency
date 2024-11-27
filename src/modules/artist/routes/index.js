import {lazy} from "react"

export const Routes = [
    {
        path: "/verify-user",
        component: lazy(() => import("../views/auth/VerifyEmail")),
        layout: "BlankLayout",
        meta: {
            general: true
        }
    },
    {
        path: "/login",
        component: lazy(() => import("../views/auth/Login")),
        layout: "BlankLayout",
        meta: {
            authRoute: true
        }
    },
    {
        path: "/forgot-password",
        component: lazy(() => import("../views/auth/ForgotPassword")),
        layout: "BlankLayout",
        meta: {
            authRoute: true
        }
    },
    {
        path: "/register",
        component: lazy(() => import("../views/auth/Register")),
        layout: "BlankLayout",
        meta: {
            authRoute: true
        }
    },
    {
        path: "/dashboard",
        component: lazy(() => import("../views/dashboard")),
        layout: 'HorizontalLayout',
        verifiedAttr: 'verified',
        meta: {
            general: true
        }
    },
    {
        path: "/security",
        component: lazy(() => import("../views/security")),
        layout: 'HorizontalLayout',
        verifiedAttr: 'verified',
        meta: {
            action: "call",
            resource: "ARTIST_ALL_PERMISSION"
        }
    },
    {
        path: "/campaigns/list",
        component: lazy(() => import("../views/campaigns-list")),
        layout: 'HorizontalLayout',
        className: 'ecommerce-application',
        verifiedAttr: 'verified',
        meta: {
            action: "call",
            resource: "ARTIST_ALL_PERMISSION"
        }
    },
    {
        path: "/campaigns/:campaignId",
        component: lazy(() => import("../views/campaign-view")),
        layout: 'HorizontalLayout',
        verifiedAttr: 'verified',
        meta: {
            action: "call",
            resource: "ARTIST_ALL_PERMISSION"
        }
    },
    {
        path: "/pending/campaigns/:campaignId",
        component: lazy(() => import("../views/campaign-view")),
        layout: 'HorizontalLayout',
        verifiedAttr: 'verified',
        meta: {
            action: "call",
            resource: "ARTIST_ALL_PERMISSION"
        }
    },
    {
        path: "/my-campaigns",
        component: lazy(() => import("../views/my-campaigns")),
        layout: 'HorizontalLayout',
        verifiedAttr: 'verified',
        meta: {
            action: "call",
            resource: "CURATOR_PERMISSION"
        }
    },
    {
        path: "/invoices/list",
        component: lazy(() => import("../views/invoices-list")),
        layout: 'HorizontalLayout',
        verifiedAttr: 'verified',
        meta: {
            action: "call",
            resource: "ARTIST_PERMISSION"
        }
    },
    {
        path: "/invoices/:id",
        component: lazy(() => import("../views/invoices-view")),
        layout: 'HorizontalLayout',
        verifiedAttr: 'verified',
        meta: {
            action: "call",
            resource: "ARTIST_PERMISSION"
        }
    },
    {
        path: "/payouts/list",
        component: lazy(() => import("../views/payouts-list")),
        layout: 'HorizontalLayout',
        verifiedAttr: 'verified',
        meta: {
            action: "call",
            resource: "CURATOR_PERMISSION"
        }
    },
    {
        path: "/payouts/:id",
        component: lazy(() => import("../views/payouts-view")),
        layout: 'HorizontalLayout',
        verifiedAttr: 'verified',
        meta: {
            action: "call",
            resource: "CURATOR_PERMISSION"
        }
    },
    {
        path: "/connections",
        component: lazy(() => import("../views/dashboard")),
        layout: 'HorizontalLayout',
        verifiedAttr: 'verified',
        meta: {
            action: "call",
            resource: "ARTIST_ALL_PERMISSION"
        }
    },
    {
        path: "/account",
        component: lazy(() => import("../views/user-account")),
        layout: 'HorizontalLayout',
        verifiedAttr: 'verified',
        meta: {
            action: "call",
            resource: "ARTIST_ALL_PERMISSION"
        }
    }
]
