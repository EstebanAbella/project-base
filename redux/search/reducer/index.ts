import { SearchReducerPropsTypes } from '../../../Utils/Types/SearchModel'
import { ServerStatus } from '../../../Utils/Types/global'
import {
  SurveyClientType,
  SurveySellerType,
} from '../../../Utils/Types/surveyType'
import * as t from '../../search/types'
import * as _t from '../../updater/types'

const SearchState: SearchReducerPropsTypes = {
  surveySellerSearchStatus: ServerStatus.IDLE,
  surveyClientSearchStatus: ServerStatus.IDLE,
}

export type PossibleActions =
  | { type: 'SET_SEARCH_SELLER_FETCHING' }
  | { type: 'SET_SEARCH_SELLER_FETCH'; payload: SurveySellerType[] }
  | { type: 'SET_SEARCH_SELLER_FETCH_ERROR' }
  | { type: 'SET_SEARCH_CLIENTS_FETCHING' }
  | { type: 'SET_SEARCH_CLIENTS_FETCH'; payload: SurveyClientType[] }
  | { type: 'SET_SEARCH_CLIENTS_FETCH_ERROR' }
  | { type: 'RESET_GLOBAL' }
  | { type: 'RESET_SEARCH' }

const reducer = (
  state = SearchState,
  action: PossibleActions
): SearchReducerPropsTypes => {
  const INITIAL_STATE = {
    surveySellerSearchStatus: ServerStatus.IDLE,
    surveyClientSearchStatus: ServerStatus.IDLE,
  }
  switch (action.type) {
    case t.SET_SEARCH_SELLER_FETCHING: {
      return {
        ...state,
        surveySellerSearchStatus: ServerStatus.FETCHING,
      }
    }
    case t.SET_SEARCH_SELLER_FETCH: {
      return {
        ...state,
        surveySellerSearchStatus: ServerStatus.FETCH,
        surveySellerSearch: action.payload,
      }
    }
    case t.SET_SEARCH_SELLER_FETCH_ERROR: {
      return {
        ...state,
        surveySellerSearchStatus: ServerStatus.FETCH_ERROR,
      }
    }

    case t.SET_SEARCH_CLIENTS_FETCHING: {
      return {
        ...state,
        surveyClientSearchStatus: ServerStatus.FETCHING,
      }
    }
    case t.SET_SEARCH_CLIENTS_FETCH: {
      return {
        ...state,
        surveyClientSearchStatus: ServerStatus.FETCH,
        surveyClientSearch: action.payload,
      }
    }
    case t.SET_SEARCH_CLIENTS_FETCH_ERROR: {
      return {
        ...state,
        surveyClientSearchStatus: ServerStatus.FETCH_ERROR,
      }
    }

    case _t.RESET_GLOBAL: {
      state = INITIAL_STATE
    }
    case t.RESET_SEARCH: {
      state = INITIAL_STATE
    }
    default:
      return {
        ...state,
      }
  }
}

export default reducer
