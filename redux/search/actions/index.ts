import { CustomErrorType } from '../../../Utils/Types/global'
import {
  SurveyClientType,
  SurveySellerType,
} from '../../../Utils/Types/surveyType'
import ApiService from '../../../services/ApiService'
import * as t from '../types'

export const setSearchSeller =
  (data: SurveySellerType[], search: string) =>
  (dispatch: (v: any) => void) => {
    dispatch({ type: t.SET_SEARCH_SELLER_FETCHING })

    const newArray = [...data].filter((data) =>
      data.name.toLowerCase().includes(search.toLowerCase())
    )
    if (newArray.length !== 0) {
      dispatch({
        type: t.SET_SEARCH_SELLER_FETCH,
        payload: newArray,
      })
    } else {
      dispatch({
        type: t.SET_SEARCH_SELLER_FETCH_ERROR,
      })
    }
  }

export const setSearchClients =
  (data: SurveyClientType[], search: string) =>
  (dispatch: (v: any) => void) => {
    dispatch({ type: t.SET_SEARCH_CLIENTS_FETCHING })

    const newArray = [...data].filter((data) =>
      data.name.toLowerCase().includes(search.toLowerCase())
    )
    if (newArray.length !== 0) {
      dispatch({
        type: t.SET_SEARCH_CLIENTS_FETCH,
        payload: newArray,
      })
    } else {
      dispatch({
        type: t.SET_SEARCH_CLIENTS_FETCH_ERROR,
      })
    }
  }

export const resetSearch = () => (dispatch: any) => {
  dispatch({ type: t.RESET_SEARCH })
}
