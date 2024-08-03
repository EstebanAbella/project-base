import { CustomErrorType } from '../../../Utils/Types/global'
import ApiService from '../../../services/ApiService'
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
    ApiService.getClients(offset, limit, query, filter, order)
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
  ApiService.getClient(id)
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
    ApiService.createClient(data)
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
  ApiService.deleteClient(id)
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
    ApiService.editClient(data)
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

  export const getClientByUser = (id: string) => (dispatch: (v: any) => void) => {
    dispatch({ type: t.GET_CLIENT_BY_USER_FETCHING })
    ApiService.getClientByUser(id)
      .then((result) => {
        dispatch({
          type: t.GET_CLIENT_BY_USER_FETCH,
          payload: result,
        })
      })
      .catch((error: CustomErrorType) => {
        dispatch({
          type: t.GET_CLIENT_BY_USER_FETCH_ERROR,
        })
      })
  }