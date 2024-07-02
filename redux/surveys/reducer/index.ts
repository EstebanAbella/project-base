import { ServerStatus } from '../../../Utils/Types/global'
import {
  SurveyClientType,
  SurveyResult,
  SurveySellerType,
  SurveysReducerPropsTypes,
} from '../../../Utils/Types/surveyType'
import * as t from '../../surveys/types'
import * as _t from '../../updater/types'

const surveyState: SurveysReducerPropsTypes = {
  surveysStatus: ServerStatus.IDLE,
  surveyStatus: ServerStatus.IDLE,
  sellersStatus: ServerStatus.IDLE,
  clientsStatus: ServerStatus.IDLE,
  surveyInitialCallStatus: ServerStatus.IDLE,
}

export type PossibleActions =
  | { type: 'GET_SURVEY_FETCHING' }
  | { type: 'GET_SURVEY_FETCH'; payload: SurveyResult }
  | { type: 'GET_SURVEY_FETCH_ERROR' }
  | { type: 'GET_SURVEYS_FETCHING' }
  | { type: 'GET_SURVEYS_FETCH'; payload: Array<SurveyResult> }
  | { type: 'GET_SURVEYS_FETCH_ERROR' }
  | { type: 'RESET_GLOBAL' }
  | { type: 'GET_SELLERS_FETCHING' }
  | { type: 'GET_SELLERS_FETCH'; payload: SurveySellerType[] }
  | { type: 'GET_SELLERS_FETCH_ERROR' }
  | { type: 'GET_CLIENTS_FETCHING' }
  | { type: 'GET_CLIENTS_FETCH'; payload: SurveyClientType[] }
  | { type: 'GET_CLIENTS_FETCH_ERROR' }
  | { type: 'GET_SURVEY_INITIAL_CALL_FETCHING' }
  | { type: 'GET_SURVEY_INITIAL_CALL_FETCH' }

const reducer = (
  state = surveyState,
  action: PossibleActions
): SurveysReducerPropsTypes => {
  const INITIAL_STATE = {
    surveysStatus: ServerStatus.IDLE,
    surveyStatus: ServerStatus.IDLE,
    sellersStatus: ServerStatus.IDLE,
    clientsStatus: ServerStatus.IDLE,
    surveyInitialCallStatus: ServerStatus.IDLE,
  }
  switch (action.type) {
    case t.GET_SURVEYS_FETCHING: {
      return {
        ...state,
        surveysStatus: ServerStatus.FETCHING,
      }
    }
    case t.GET_SURVEYS_FETCH: {
      return {
        ...state,
        surveysStatus: ServerStatus.FETCH,
        surveys: action.payload,
      }
    }
    case t.GET_SURVEYS_FETCH_ERROR: {
      return {
        ...state,
        surveysStatus: ServerStatus.FETCH_ERROR,
      }
    }
    case t.GET_SURVEY_FETCHING: {
      return {
        ...state,
        surveyStatus: ServerStatus.FETCHING,
      }
    }
    case t.GET_SURVEY_FETCH: {
      return {
        ...state,
        survey: action.payload,
        surveyStatus: ServerStatus.FETCH,
      }
    }
    case t.GET_SURVEY_FETCH_ERROR: {
      return {
        ...state,
        surveyStatus: ServerStatus.FETCH_ERROR,
      }
    }
    case t.GET_SELLERS_FETCHING: {
      return {
        ...state,
        sellersStatus: ServerStatus.FETCHING,
      }
    }
    case t.GET_SELLERS_FETCH: {
      return {
        ...state,
        sellersStatus: ServerStatus.FETCH,
        sellers: action.payload,
      }
    }
    case t.GET_SELLERS_FETCH_ERROR: {
      return {
        ...state,
        sellersStatus: ServerStatus.FETCH_ERROR,
      }
    }
    case t.GET_CLIENTS_FETCHING: {
      return {
        ...state,
        clientsStatus: ServerStatus.FETCHING,
      }
    }
    case t.GET_CLIENTS_FETCH: {
      return {
        ...state,
        clientsStatus: ServerStatus.FETCH,
        clients: action.payload,
      }
    }
    case t.GET_CLIENTS_FETCH_ERROR: {
      return {
        ...state,
        clientsStatus: ServerStatus.FETCH_ERROR,
      }
    }
    case t.GET_SURVEY_INITIAL_CALL_FETCH: {
      return {
        ...state,
        surveyInitialCallStatus: ServerStatus.FETCH,
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
