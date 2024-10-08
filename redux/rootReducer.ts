import { combineReducers } from "redux"
import authReducer from "./auth/reducer"
import userReducer from "./user/reducer"
import updaterReducer from "./updater/reducer"
import navigationReducer from "./isNavigationOnline/reducer"
import clientReducer from "./client/reducer"
import botTrainingReducer from "./botTraining/reducer"

// const rootReducer = combineReducers({
//   auth: authReducer,
//   user: userReducer,
//   client: clientReducer,
//   updater: updaterReducer,
//   isNavigationOnOff: navigationReducer,
// })

// export type RootState = ReturnType<typeof rootReducer>

// export default rootReducer
// Define el rootReducer
const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  client: clientReducer,
  updater: updaterReducer,
  isNavigationOnOff: navigationReducer,
  botTraining: botTrainingReducer,
})

const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any
) => {
  if (action.type === "LOGOUT") {
    state = undefined
  }
  return appReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
