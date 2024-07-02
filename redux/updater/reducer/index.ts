import { AuthReducerPropsType } from '../../../Utils/Types/authModel'
import { ServerStatus } from '../../../Utils/Types/global'
import { loggedUser } from '../../../models/models'
import * as t from '../types'

export type UpdaterReducerType = {
  updaterStatus: ServerStatus
  updaterCheckerStatus: ServerStatus
  updateNeeded: boolean
}

const globalState: UpdaterReducerType = {
  updaterStatus: ServerStatus.IDLE,
  updaterCheckerStatus: ServerStatus.IDLE,
  updateNeeded: false,
}

export type PosibleActions =
  | { type: 'DO_UPDATE_FETCHING' }
  | { type: 'DO_UPDATE_FETCH' }
  | { type: 'DO_UPDATE_FETCH_ERROR' }
  | { type: 'CHECKER_UPDATE_FETCHING' }
  | { type: 'CHECKER_UPDATE_FETCH'; payload: boolean }
  | { type: 'CHECKER_UPDATE_FETCH_ERROR'; payload: boolean }
  | { type: 'RESET_GLOBAL' }

const reducer = (
  state = globalState,
  action: PosibleActions
): UpdaterReducerType => {
  const INITIAL_STATE = {
    updaterStatus: ServerStatus.IDLE,
    updaterCheckerStatus: ServerStatus.IDLE,
    updateNeeded: false,
  }
  switch (action.type) {
    case t.DO_UPDATE_FETCHING: {
      return {
        ...state,
        updaterStatus: ServerStatus.FETCHING,
      }
    }
    case t.DO_UPDATE_FETCH: {
      return {
        ...state,
        updaterStatus: ServerStatus.FETCH,
      }
    }
    case t.DO_UPDATE_FETCH_ERROR: {
      return {
        ...state,
        updaterStatus: ServerStatus.FETCH_ERROR,
      }
    }
    case t.CHECKER_UPDATE_FETCHING:
      return {
        ...state,
        updaterCheckerStatus: ServerStatus.FETCHING,
      }
    case t.CHECKER_UPDATE_FETCH:
      return {
        ...state,
        updaterCheckerStatus: ServerStatus.FETCH,
        updateNeeded: action.payload,
      }
    case t.CHECKER_UPDATE_FETCH_ERROR:
      return {
        ...state,
        updaterCheckerStatus: ServerStatus.FETCH_ERROR,
        updateNeeded: action.payload,
      }
    case t.RESET_GLOBAL: {
      state = INITIAL_STATE
    }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
