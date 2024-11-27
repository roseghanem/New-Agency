// ** Redux Imports
import { combineReducers } from 'redux'
import PluggedInModules from "../../configs/PluggedInModules"

// ** Basic Modules Reducers
import coreReducers from '@store/reducers/basicReducer'
import _ from "lodash"
import FinalNavigation from "../../navigation/horizontal"

// ** Merge Reducers
const FinalReducers = {}

// ** Merge Routes
_.forEach(PluggedInModules, (module, _i) => {
  if (module.path.Reducer && module.enabled) {
    if (module.moduleGroups && _.size(module.moduleGroups) > 0) {
      if (module.moduleGroups.indexOf(process.env.REACT_APP_AUTH_MODULE) > -1) {
        FinalReducers[_i] = module.path.Reducer
      }
    } else {
      FinalReducers[_i] = module.path.Reducer
    }
  }
})

const rootReducer = combineReducers({
  ...coreReducers,
  ...FinalReducers
})

export default rootReducer
