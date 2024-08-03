import UserServiceSingleton from '../../../services/apiService/user'
import { CustomErrorType } from '../../../Utils/Types/global'

import * as t from '../types'

export const getUsers =
  (
    offset: number,
    limit?: number,
    query?: string,
    filter?: string,
    order?: string
  ) =>
  (dispatch: (v: any) => void) => {
    dispatch({ type: t.GET_USERS_FETCHING })
    UserServiceSingleton.getUsers(offset, limit, query, filter, order)
      .then((result) => {
        dispatch({
          type: t.GET_USERS_FETCH,
          payload: result,
        })
      })
      .catch((error: CustomErrorType) => {
        dispatch({
          type: t.GET_USERS_FETCH_ERROR,
        })
      })
  }

export const getUser = (id: string) => (dispatch: (v: any) => void) => {
  dispatch({ type: t.GET_USER_FETCHING })
  UserServiceSingleton.getUser(id)
    .then((result) => {
      dispatch({
        type: t.GET_USER_FETCH,
        payload: result,
      })
    })
    .catch((error: CustomErrorType) => {
      dispatch({
        type: t.GET_USER_FETCH_ERROR,
      })
    })
}

export const createUser =
  (data: { [key: string]: string }) => (dispatch: any) => {
    dispatch({ type: t.CREATE_USER_FETCHING })
    UserServiceSingleton.createUser(data)
      .then(() => {
        dispatch({
          type: t.CREATE_USER_FETCH,
        })
      })
      .catch((error: CustomErrorType) => {
        dispatch({
          type: t.CREATE_USER_FETCH_ERROR,
        })
      })
  }

export const deleteUser = (id: string) => (dispatch: any) => {
  dispatch({ type: t.DELETE_USER_FETCHING })
  UserServiceSingleton.deleteUser(id)
    .then(() => {
      dispatch({
        type: t.DELETE_USER_FETCH,
      })
    })
    .catch((error: CustomErrorType) => {
      dispatch({
        type: t.DELETE_USER_FETCH_ERROR,
      })
    })
}

export const editUser =
  (data: { [key: string]: string }) => (dispatch: any) => {
    dispatch({ type: t.EDIT_USER_FETCHING })
    UserServiceSingleton.editUser(data)
      .then(() => {
        dispatch({
          type: t.EDIT_USER_FETCH,
        })
      })
      .catch((error: CustomErrorType) => {
        dispatch({
          type: t.EDIT_USER_FETCH_ERROR,
        })
      })
  }
