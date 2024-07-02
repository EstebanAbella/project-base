import {
  ClientsReducerPropsType,
  clientListType,
} from '../../../Utils/Types/clientType'
import { Paginator, ServerStatus } from '../../../Utils/Types/global'
import * as t from '../types'

const globalState: ClientsReducerPropsType = {
  clientsStatus: ServerStatus.IDLE,
}

export type PosibleActions =
  | { type: 'CLIENTS_FETCHING' }
  | { type: 'CLIENTS_FETCH'; payload: clientListType[] }
  | { type: 'CLIENTS_FETCH_ERROR' }

const reducer = (
  state = globalState,
  action: PosibleActions
): ClientsReducerPropsType => {
  switch (action.type) {
    case t.CLIENTS_FETCHING: {
      return {
        ...state,
        clientsStatus: ServerStatus.FETCHING,
      }
    }
    case t.CLIENTS_FETCH: {
      return {
        ...state,
        clientsStatus: ServerStatus.FETCH,
        clients: action.payload,
      }
    }
    case t.CLIENTS_FETCH_ERROR: {
      return {
        ...state,
        clientsStatus: ServerStatus.FETCH_ERROR,
      }
    }

    default:
      return {
        ...state,
      }
  }
}

export default reducer
