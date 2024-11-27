import PluggedInModules from "../../configs/PluggedInModules"
import _ from "lodash"

let FinalNavigation = []

// ** Merge Navigations
_.forEach(PluggedInModules, (module, _i) => {
    if (module.path.Navigation && module.enabled && module.enableNavigations) {
        if (module.moduleGroups && _.size(module.moduleGroups) > 0) {
            if (module.moduleGroups.indexOf(process.env.REACT_APP_AUTH_MODULE) > -1) {
                FinalNavigation = [...FinalNavigation, ...module.path.Navigation]
            }
        } else {
            FinalNavigation = [...FinalNavigation, ...module.path.Navigation]
        }
    }
})

export default FinalNavigation
