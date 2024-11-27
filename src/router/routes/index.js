import { lazy } from 'react'
import PluggedInModules from "../../configs/PluggedInModules"
import _ from "lodash"

// ** Document title
const TemplateTitle = '%s - FrameWork'

// ** Default Route
const DefaultRoute = '/dashboard'
const LoginRoute = '/login'
const VerificationRoute = '/verify-user'

// ** Merge Routes
let FinalRoutes = []

// ** Merge Routes
_.forEach(PluggedInModules, (module, _i) => {
	if (module.path.Routes && module.enabled && module.enableRoutes) {
		if (module.moduleGroups && _.size(module.moduleGroups) > 0) {
			if (module.moduleGroups.indexOf(process.env.REACT_APP_AUTH_MODULE) > -1) {
				FinalRoutes = [...FinalRoutes, ...module.path.Routes]
			}
		} else {
			FinalRoutes = [...FinalRoutes, ...module.path.Routes]
		}
	}
})

export { DefaultRoute, LoginRoute, VerificationRoute, TemplateTitle, FinalRoutes as Routes }
