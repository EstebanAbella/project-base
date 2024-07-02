import { ServerStatus } from '../global'
import { SurveyClientType, SurveySellerType } from '../surveyType/index'

export type SearchReducerPropsTypes = {
  surveySellerSearchStatus: ServerStatus
  surveySellerSearch?: SurveySellerType[]
  surveyClientSearchStatus: ServerStatus
  surveyClientSearch?: SurveyClientType[]
}
