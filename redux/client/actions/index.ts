import { CustomErrorType } from '../../../Utils/Types/global'
import ApiService from '../../../services/ApiService'
import * as t from '../types'

export const getClients =
  (
    offset?: number,
    limit?: number,
    query?: string,
    filter?: string,
    order?: string
  ) =>
  (dispatch: (v: any) => void) => {
    dispatch({ type: t.CLIENTS_FETCHING })
    ApiService.getClients(offset, limit, query, filter, order)
      .then((result) => {
        dispatch({
          type: t.CLIENTS_FETCH,
          payload: result,
        })
      })
      .catch((error: CustomErrorType) => {
        // dispatch(showToastWarning(`${error.statusMessage}`))
        dispatch({
          type: t.CLIENTS_FETCH_ERROR,
        })
      })
  }
