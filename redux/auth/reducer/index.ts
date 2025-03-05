import { ServerStatus } from "../../../interface/global"
import { loggedUser } from "../../../models/models"
import * as t from "../types"
import * as _t from "../../updater/types"
import { AuthReducerPropsType } from "../../../interface/authModel.interface"

const globalState: AuthReducerPropsType = {
  loginStatus: ServerStatus.IDLE,
  restorePasswordStatus: ServerStatus.IDLE,
  restorePasswordValidatedStatus: ServerStatus.IDLE,
  authUserByTokenStatus: ServerStatus.IDLE,
}

export type PosibleActions =
  | { type: "LOGIN_FETCHING" }
  | { type: "LOGIN_FETCH"; payload: loggedUser }
  | { type: "LOGIN_FETCH_ERROR"; payload: string }
  | { type: "LOGOUT" }
  | { type: "RESTORE_PASS_FETCHING" }
  | { type: "RESTORE_PASS_FETCH" }
  | { type: "RESTORE_PASS_FETCH_ERROR" }
  | { type: "RESTORE_PASS_VALIDATED_FETCHING" }
  | { type: "RESTORE_PASS_VALIDATED_FETCH" }
  | { type: "RESTORE_PASS_VALIDATED_FETCH_ERROR" }
  | { type: "AUTH_USER_BY_TOKEN_FETCHING" }
  | { type: "AUTH_USER_BY_TOKEN_FETCH"; payload: loggedUser }
  | { type: "AUTH_USER_BY_TOKEN_FETCH_ERROR" }
  | { type: "RESET_GLOBAL" }

const reducer = (
  state = globalState,
  action: PosibleActions
): AuthReducerPropsType => {
  const INITIAL_STATE = {
    loginStatus: ServerStatus.IDLE,
    restorePasswordStatus: ServerStatus.IDLE,
    restorePasswordValidatedStatus: ServerStatus.IDLE,
    authUserByTokenStatus: ServerStatus.IDLE,
  }
  switch (action.type) {
    case t.LOGIN_FETCHING: {
      return {
        ...state,
        loginStatus: ServerStatus.FETCHING,
        loginStatusMessage: undefined,
      }
    }
    case t.LOGIN_FETCH: {
      return {
        ...state,
        loginStatus: ServerStatus.FETCH,
        user: action.payload,
      }
    }
    case t.LOGIN_FETCH_ERROR: {
      return {
        ...state,
        loginStatus: ServerStatus.FETCH_ERROR,
        loginStatusMessage: action.payload || "There was an Error with de Api",
      }
    }
    case t.LOGOUT:
      return {
        ...state,
        loginStatus: ServerStatus.IDLE,
        loginStatusMessage: "",
      }
    case t.RESTORE_PASS_FETCHING:
      return {
        ...state,
        restorePasswordStatus: ServerStatus.FETCHING,
      }
    case t.RESTORE_PASS_FETCH:
      return {
        ...state,
        restorePasswordStatus: ServerStatus.FETCH,
      }
    case t.RESTORE_PASS_FETCH_ERROR:
      return {
        ...state,
        restorePasswordStatus: ServerStatus.FETCH_ERROR,
      }
    case t.RESTORE_PASS_VALIDATED_FETCHING:
      return {
        ...state,
        restorePasswordValidatedStatus: ServerStatus.FETCHING,
      }
    case t.RESTORE_PASS_VALIDATED_FETCH:
      return {
        ...state,
        restorePasswordValidatedStatus: ServerStatus.FETCH,
      }
    case t.RESTORE_PASS_VALIDATED_FETCH_ERROR:
      return {
        ...state,
        restorePasswordValidatedStatus: ServerStatus.FETCH_ERROR,
      }
    case t.AUTH_USER_BY_TOKEN_FETCHING: {
      return {
        ...state,
        authUserByTokenStatus: ServerStatus.FETCHING,
      }
    }
    case t.AUTH_USER_BY_TOKEN_FETCH: {
      return {
        ...state,
        user: action.payload,
        loginStatus: ServerStatus.FETCH,
        authUserByTokenStatus: ServerStatus.FETCH,
      }
    }
    case t.AUTH_USER_BY_TOKEN_FETCH_ERROR: {
      return {
        ...state,
        authUserByTokenStatus: ServerStatus.FETCH_ERROR,
        loginStatus: ServerStatus.FETCH_ERROR,
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
