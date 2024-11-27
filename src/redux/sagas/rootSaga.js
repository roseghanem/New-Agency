import {all, fork} from 'redux-saga/effects'
import PluggedInModules from "../../configs/PluggedInModules"
import _ from "lodash"

let FinalSagas = []

// ** Merge Sagas
_.forEach(PluggedInModules, (module, _i) => {
	if (module.path.Sagas && module.enabled) {
		if (module.moduleGroups && _.size(module.moduleGroups) > 0) {
			if (module.moduleGroups.indexOf(process.env.REACT_APP_AUTH_MODULE) > -1) {
				FinalSagas = [...FinalSagas, fork(module.path.Sagas)]
			}
		} else {
			FinalSagas = [...FinalSagas, fork(module.path.Sagas)]
		}
	}
})

export default function* () {
	yield all(FinalSagas)
}
