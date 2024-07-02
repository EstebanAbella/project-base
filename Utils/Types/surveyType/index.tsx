import { Paginator, ServerStatus } from '../global'

export type SurveyResult = {
  id: number
  name: string
  version: string
  seller: SurveySellerType
  client: SurveyClientType
}

export type SurveySellerType = {
  id: number
  name: string
  address: string
  clients?: Array<SurveyClientType>
}

export type SurveyClientType = {
  id: number
  name: string
  address: string
  code: string
  channelId: string
  channelName: string
}

export type SurveysReducerPropsTypes = {
  surveysStatus: ServerStatus
  surveys?: Array<SurveyResult>
  surveyStatus: ServerStatus
  survey?: SurveyResult
  sellersStatus: ServerStatus
  sellers?: Array<SurveySellerType>
  clientsStatus: ServerStatus
  clients?: Array<SurveyClientType>
  surveyInitialCallStatus: ServerStatus
}
