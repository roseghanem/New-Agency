import {lazy} from "react"

export const Routes = [
    {
        path: "/login",
        component: lazy(() => import("../views/auth/Login")),
        layout: "BlankLayout",
        meta: {
            authRoute: true
        }
    },
    {
        path: "/dashboard",
        component: lazy(() => import("../views/dashboard")),
        meta: {
            general: true
        }
    },
    {
        path: "/privacy",
        component: lazy(() => import("../views/privacy")),
        layout: "BlankLayout",
        meta: {
            publicRoute: true
        }
    },
    {
        path: "/admin/list",
        component: lazy(() => import("../views/admin-list")),
        meta: {
            action: "call",
            resource: "ADMINS_VIEW_LIST"
        }
    }
    // {
    //     path: "/scraping-jobs/list",
    //     component: lazy(() => import("../views/scraping-jobs-list")),
    //     meta: {
    //         action: "call",
    //         resource: "ROLES_VIEW_LIST"
    //     }
    // },
]
