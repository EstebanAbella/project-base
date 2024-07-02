import { ServerStatus } from '../../../Utils/Types/global'
import * as t from '../../isNavigationOnline/types'

export type isNavigationOnlineReducerPropsTypes = {
  isNavigationOnlineStatus: ServerStatus
  isNavigationOnline?: Boolean
}

const isNavigationOnlineState: isNavigationOnlineReducerPropsTypes = {
  isNavigationOnlineStatus: ServerStatus.IDLE,
}

export type PossibleActions = {
  type: 'IS_NAVIGATION_ONLINE_FETCH'
  payload: boolean
}

const reducer = (
  state = isNavigationOnlineState,
  action: PossibleActions
): isNavigationOnlineReducerPropsTypes => {
  switch (action.type) {
    case t.IS_NAVIGATION_ONLINE_FETCH: {
      return {
        ...state,
        isNavigationOnlineStatus: ServerStatus.FETCH,
        isNavigationOnline: action.payload,
      }
    }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
