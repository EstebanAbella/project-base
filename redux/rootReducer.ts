import { combineReducers } from 'redux'
import authReducer from './auth/reducer'
import userReducer from './user/reducer'
import updaterReducer from './updater/reducer'
import searchReducer from './search/reducer'
import navigationReducer from './isNavigationOnline/reducer'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  updater: updaterReducer,
  search: searchReducer,
  isNavigationOnOff: navigationReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
