import {lazy} from "react"

export const Routes = [
    {
        path: "/scraping-jobs/lists",
        component: lazy(() => import("../views/scraping-jobs-list")),
        meta: {
            action: "call",
            resource: "SCRAPING_VIEW_PLAYLISTS"
        }
    },
    {
        path: "/playlist/scraping/:scrapingId",
        component: lazy(() => import("../views/scraped-playlist-list")),
        meta: {
            action: "call",
            resource: "SCRAPING_VIEW_SCRAPED_PLAYLIST"
        }
    },
    {
        path: "/crm/list",
        component: lazy(() => import("../views/crm-list")),
        meta: {
            action: "call",
            resource: "SCRAPING_VIEW_CRM_LIST"
        }
    },
    {
        path: "/artist/profile/:artistId",
        component: lazy(() => import("../views/artist-profile")),
        meta: {
            action: "call",
            resource: "SCRAPING_VIEW_ARTIST_PROFILE"
        }
    },
    {
        path: "/logs",
        component: lazy(() => import("../views/log")),
        meta: {
            action: "call",
            resource: "LOG_LIST"
        }
    }
]
