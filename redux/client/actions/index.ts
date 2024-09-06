import ClientServiceSingleton from '../../../services/apiService/client'
import { CustomErrorType } from '../../../Utils/Types/global'

import * as t from '../types'

export const getClients =
  (
    offset: number,
    limit?: number,
    query?: string,
    filter?: string,
    order?: string
  ) =>
  (dispatch: (v: any) => void) => {
    dispatch({ type: t.GET_CLIENTS_FETCHING })
    ClientServiceSingleton.getClients(offset, limit, query, filter, order)
      .then((result) => {
        dispatch({
          type: t.GET_CLIENTS_FETCH,
          payload: result,
        })
      })
      .catch((error: CustomErrorType) => {
        dispatch({
          type: t.GET_CLIENTS_FETCH_ERROR,
        })
      })
  }

export const getClient = (id: string) => (dispatch: (v: any) => void) => {
  dispatch({ type: t.GET_CLIENT_FETCHING })
  ClientServiceSingleton.getClient(id)
    .then((result) => {
      dispatch({
        type: t.GET_CLIENT_FETCH,
        payload: result,
      })
    })
    .catch((error: CustomErrorType) => {
      dispatch({
        type: t.GET_CLIENT_FETCH_ERROR,
      })
    })
}

export const createClient =
  (data: { [key: string]: string }) => (dispatch: any) => {
    dispatch({ type: t.CREATE_CLIENT_FETCHING })
    ClientServiceSingleton.createClient(data)
      .then(() => {
        dispatch({
          type: t.CREATE_CLIENT_FETCH,
        })
      })
      .catch((error: CustomErrorType) => {
        dispatch({
          type: t.CREATE_CLIENT_FETCH_ERROR,
        })
      })
  }

export const deleteClient = (id: string) => (dispatch: any) => {
  dispatch({ type: t.DELETE_CLIENT_FETCHING })
  ClientServiceSingleton.deleteClient(id)
    .then(() => {
      dispatch({
        type: t.DELETE_CLIENT_FETCH,
      })
    })
    .catch((error: CustomErrorType) => {
      dispatch({
        type: t.DELETE_CLIENT_FETCH_ERROR,
      })
    })
}

export const editClient =
  (data: { [key: string]: string }) => (dispatch: any) => {
    dispatch({ type: t.EDIT_CLIENT_FETCHING })
    ClientServiceSingleton.editClient(data)
      .then(() => {
        dispatch({
          type: t.EDIT_CLIENT_FETCH,
        })
      })
      .catch((error: CustomErrorType) => {
        dispatch({
          type: t.EDIT_CLIENT_FETCH_ERROR,
        })
      })
  }

  export const getClientsByUserId = (id: string) => (dispatch: (v: any) => void) => {
    dispatch({ type: t.GET_CLIENTS_BY_USER_ID_FETCHING })
    ClientServiceSingleton.getClientsByUserId(id)
      .then((result) => {
        dispatch({
          type: t.GET_CLIENTS_BY_USER_ID_FETCH,
          payload: result,
        })
      })
      .catch((error: CustomErrorType) => {
        dispatch({
          type: t.GET_CLIENTS_BY_USER_ID_FETCH_ERROR,
        })
      })
  }