import { CustomErrorType } from '../../../Utils/Types/global'
import {
  SurveyClientType,
  SurveyResult,
  SurveySellerType,
} from '../../../Utils/Types/surveyType'
import ApiService from '../../../services/ApiService'
import * as t from '../types'

export const getSurveys =
  (
    offset?: number,
    limit?: number,
    query?: string,
    filter?: string,
    order?: string
  ) =>
  (dispatch: (v: any) => void) => {
    dispatch({ type: t.GET_SURVEYS_FETCHING })
    ApiService.getSurveys(offset, limit, query, filter, order)
      .then((result) => {
        dispatch({
          type: t.GET_SURVEYS_FETCH,
          payload: result,
        })
        const dateNow = new Date()
        window.localStorage.setItem('surveyCall', JSON.stringify(result))
        window.localStorage.setItem('timeSurveyCall', dateNow.toString())
      })
      .catch((error: CustomErrorType) => {
        dispatch({
          type: t.GET_SURVEYS_FETCH_ERROR,
        })
      })
  }

export const getSurvey = (id: number) => (dispatch: (v: any) => void) => {
  dispatch({ type: t.GET_SURVEY_FETCHING })
  ApiService.getSurvey(id)
    .then((result) => {
      dispatch({
        type: t.GET_SURVEY_FETCH,
        payload: result,
      })
    })
    .catch((error: CustomErrorType) => {
      dispatch({
        type: t.GET_SURVEY_FETCH_ERROR,
      })
    })
}

export const getSellers =
  (data: SurveyResult[]) => (dispatch: (v: any) => void) => {
    dispatch({ type: t.GET_SELLERS_FETCHING })
    const uniqueSellers: SurveySellerType[] = []
    const idsView = new Set()

    data.forEach((item) => {
      const sellerId = item.seller.id
      if (!idsView.has(sellerId)) {
        idsView.add(sellerId)
        uniqueSellers.push(item.seller)
      }
    })

    if (uniqueSellers.length !== 0) {
      dispatch({
        type: t.GET_SELLERS_FETCH,
        payload: uniqueSellers,
      })
    } else {
      dispatch({
        type: t.GET_SELLERS_FETCH_ERROR,
      })
    }
  }

export const getClients =
  (data: SurveyResult[], idSeller: number) => (dispatch: (v: any) => void) => {
    dispatch({ type: t.GET_CLIENTS_FETCHING })

    const clientsSet = new Set()
    const idsView = new Set()

    data.forEach((survey) => {
      const clientId = survey.client.id
      if (survey.seller.id === idSeller && !idsView.has(clientId)) {
        idsView.add(clientId)
        clientsSet.add(survey.client)
      }
    })
    const clientsArray = Array.from(clientsSet)

    if (clientsArray.length !== 0) {
      dispatch({
        type: t.GET_CLIENTS_FETCH,
        payload: clientsArray,
      })
    } else {
      dispatch({
        type: t.GET_CLIENTS_FETCH_ERROR,
      })
    }
  }

function compareDates(fecha1: Date, fecha2: Date): boolean {
  // Extraer año, mes y día de la fecha1
  const año1 = fecha1.getFullYear()
  const mes1 = fecha1.getMonth()
  const dia1 = fecha1.getDate()

  // Extraer año, mes y día de la fecha2
  const año2 = fecha2.getFullYear()
  const mes2 = fecha2.getMonth()
  const dia2 = fecha2.getDate()

  // Comparar si no son el mismo día
  return año1 !== año2 || mes1 !== mes2 || dia1 !== dia2
}

export const surveyCall = () => (dispatch: (v: any) => void) => {
  const currentDate: Date = new Date()
  const anotherDateString = window.localStorage.getItem('timeSurveyCall')

  if (!currentDate || !anotherDateString) {
    //getSurveys()
    return
  }
  // Convertir la cadena a objeto Date
  const anotherDate: Date = new Date(anotherDateString as string)

  const moreThanOneDay = compareDates(currentDate, anotherDate)

  if (moreThanOneDay) {
    //getSurveys()
    console.log('Han pasado más de 24 horas desde otra Fecha.')
    dispatch({
      type: t.GET_SURVEY_INITIAL_CALL_FETCH,
    })
  } else {
    console.log('No han pasado más de 24 horas desde otra Fecha.')
    dispatch({ type: t.GET_SURVEYS_FETCHING })
    const surveyCallString = window.localStorage.getItem('surveyCall')
    if (surveyCallString !== null) {
      const surveyCallObject = JSON.parse(surveyCallString)
      dispatch({
        type: t.GET_SURVEYS_FETCH,
        payload: surveyCallObject,
      })
    } else {
      dispatch({
        type: t.GET_SURVEYS_FETCH_ERROR,
      })
    }
  }
}
