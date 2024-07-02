import { Paginator, ServerStatus } from '../../../Utils/Types/global'
import {
  UserResult,
  UsersReducerPropsTypes,
} from '../../../Utils/Types/userType'
import * as t from '../types'
import * as _t from '../../updater/types'

const userState: UsersReducerPropsTypes = {
  usersStatus: ServerStatus.IDLE,
  userStatus: ServerStatus.IDLE,
  userCreateStatus: ServerStatus.IDLE,
  userDeleteStatus: ServerStatus.IDLE,
  userEditStatus: ServerStatus.IDLE,
}

export type PossibleActions =
  | { type: 'CREATE_USER_FETCHING' }
  | { type: 'CREATE_USER_FETCH' }
  | { type: 'CREATE_USER_FETCH_ERROR' }
  | { type: 'DELETE_USER_FETCHING' }
  | { type: 'DELETE_USER_FETCH' }
  | { type: 'DELETE_USER_FETCH_ERROR' }
  | { type: 'EDIT_USER_FETCHING' }
  | { type: 'EDIT_USER_FETCH' }
  | { type: 'EDIT_USER_FETCH_ERROR' }
  | { type: 'GET_USER_FETCHING' }
  | { type: 'GET_USER_FETCH'; payload: UserResult }
  | { type: 'GET_USER_FETCH_ERROR' }
  | { type: 'GET_USERS_FETCHING' }
  | { type: 'GET_USERS_FETCH'; payload: Array<UserResult> }
  | { type: 'GET_USERS_FETCH_ERROR' }
  | { type: 'RESET_GLOBAL' }

const reducer = (
  state = userState,
  action: PossibleActions
): UsersReducerPropsTypes => {
  const INITIAL_STATE = {
    usersStatus: ServerStatus.IDLE,
    userStatus: ServerStatus.IDLE,
    userCreateStatus: ServerStatus.IDLE,
    userDeleteStatus: ServerStatus.IDLE,
    userEditStatus: ServerStatus.IDLE,
  }
  switch (action.type) {
    case t.GET_USERS_FETCHING: {
      return {
        ...state,
        usersStatus: ServerStatus.FETCHING,
      }
    }
    case t.GET_USERS_FETCH: {
      return {
        ...state,
        usersStatus: ServerStatus.FETCH,
        users: action.payload,
      }
    }
    case t.GET_USERS_FETCH_ERROR: {
      return {
        ...state,
        usersStatus: ServerStatus.FETCH_ERROR,
      }
    }
    case t.GET_USER_FETCHING: {
      return {
        ...state,
        userStatus: ServerStatus.FETCHING,
      }
    }
    case t.GET_USER_FETCH: {
      return {
        ...state,
        user: action.payload,
        userStatus: ServerStatus.FETCH,
      }
    }
    case t.GET_USER_FETCH_ERROR: {
      return {
        ...state,
        userStatus: ServerStatus.FETCH_ERROR,
      }
    }
    case t.CREATE_USER_FETCHING: {
      return {
        ...state,
        userCreateStatus: ServerStatus.FETCHING,
      }
    }
    case t.CREATE_USER_FETCH: {
      return {
        ...state,
        userCreateStatus: ServerStatus.FETCH,
      }
    }
    case t.CREATE_USER_FETCH_ERROR: {
      return {
        ...state,
        userCreateStatus: ServerStatus.FETCH_ERROR,
      }
    }
    case t.DELETE_USER_FETCHING: {
      return {
        ...state,
        userDeleteStatus: ServerStatus.FETCHING,
      }
    }
    case t.DELETE_USER_FETCH: {
      return {
        ...state,
        userDeleteStatus: ServerStatus.FETCH,
      }
    }
    case t.DELETE_USER_FETCH_ERROR: {
      return {
        ...state,
        userDeleteStatus: ServerStatus.FETCH_ERROR,
      }
    }
    case t.EDIT_USER_FETCHING: {
      return {
        ...state,
        userEditStatus: ServerStatus.FETCHING,
      }
    }
    case t.EDIT_USER_FETCH: {
      return {
        ...state,
        userEditStatus: ServerStatus.FETCH,
      }
    }
    case t.EDIT_USER_FETCH_ERROR: {
      return {
        ...state,
        userEditStatus: ServerStatus.FETCH_ERROR,
      }
    }
    case _t.RESET_GLOBAL: {
      state = INITIAL_STATE
    }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
