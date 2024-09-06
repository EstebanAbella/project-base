import { DispatchEmptyObject } from '../../../Utils/Types/global'
import { loggedUser } from '../../../models/models'
import LocalDataService from '../../../services/LocalDataService'
import ApiService from '../../../services/apiService/ApiService'
import ApiServiceSingleton from '../../../services/apiService/ApiService'
import AuthServiceSingleton from '../../../services/apiService/auth'
import * as t from '../types'

export type loginFormType = {
  email: string
  password: string
}

// Login
export const doLogin =
  ({ email, password }: loginFormType) =>
  (dispatch: any) => {
    dispatch({ type: t.LOGIN_FETCHING })
    AuthServiceSingleton.doLogin(email, password)
      .then((res) => {
        if (res) {
          const result = res as loggedUser
          if (result.token) ApiService.setToken(result.token)
          dispatch({ type: t.LOGIN_FETCH, payload: { ...result } })
        } else
          dispatch({ type: t.LOGIN_FETCH_ERROR, payload: 'Not User Found' })
      })
      .catch((err) => {
        dispatch({ type: t.LOGIN_FETCH_ERROR, payload: err.message })
      })
  }

// Logout
export const doLogout = () => (dispatch: DispatchEmptyObject) => {
  dispatch({
    type: t.LOGOUT,
  })
  redirectAndClearData()
}

const redirectAndClearData = (): void => {
  LocalDataService.clearData()
  window.location.href = '/login'
}

// RESTORE PASSWORD
export const doRestorePassword =
  (data: { email: string; location: string; backoffice: boolean }) =>
  (dispatch: any) => {
    dispatch({
      type: t.RESTORE_PASS_FETCHING,
    })
    AuthServiceSingleton.doRestorePassword(data)
      .then((response) => {
        dispatch({
          type: t.RESTORE_PASS_FETCH,
        })
      })
      .catch(() => {
        dispatch({
          type: t.RESTORE_PASS_FETCH_ERROR,
        })
      })
  }

export const doRestorePasswordValidated =
  (data: { newPassword: string; token: string }) => (dispatch: any) => {
    dispatch({ type: t.RESTORE_PASS_VALIDATED_FETCHING })
    AuthServiceSingleton.doRestorePasswordValidated(data)
      .then((response) => {
        dispatch({
          type: t.RESTORE_PASS_VALIDATED_FETCH,
        })
      })
      .catch(() => {
        dispatch({
          type: t.RESTORE_PASS_VALIDATED_FETCH_ERROR,
        })
      })
  }

// AUTH TOKEN
export const getUserByToken = () => (dispatch: any) => {
  dispatch({ type: t.AUTH_USER_BY_TOKEN_FETCHING })
  const token = LocalDataService.getToken()

  if (token) {
    AuthServiceSingleton.getUserByToken(token)
      .then((response: loggedUser) => {
        console.log('RESPONSE', response)
        dispatch({
          type: t.AUTH_USER_BY_TOKEN_FETCH,
          payload: response,
        })
      })
      .catch(() => {
        LocalDataService.clearData()
        dispatch({
          type: t.AUTH_USER_BY_TOKEN_FETCH_ERROR,
        })
      })
  } else {
    LocalDataService.clearData()
    dispatch({
      type: t.AUTH_USER_BY_TOKEN_FETCH_ERROR,
    })
  }
}
