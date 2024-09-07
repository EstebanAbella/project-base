import { clientType, ClientsReducerPropsType } from '../../../Utils/Types/clientType';
import { Paginator, ServerStatus } from '../../../Utils/Types/global'
import * as t from '../types'

const globalState: ClientsReducerPropsType = {
  clientsStatus: ServerStatus.IDLE,
  clientStatus: ServerStatus.IDLE,
  clientsByUserIdStatus: ServerStatus.IDLE,
  clientCreateStatus: ServerStatus.IDLE,
  clientDeleteStatus: ServerStatus.IDLE,
  clientEditStatus: ServerStatus.IDLE,
}

export type PosibleActions =
  | { type: 'GET_CLIENTS_FETCHING' }
  | { type: 'GET_CLIENTS_FETCH'; payload: Paginator<clientType> }
  | { type: 'GET_CLIENTS_FETCH_ERROR' }

  | { type: 'GET_CLIENT_FETCHING' }
  | { type: 'GET_CLIENT_FETCH'; payload: clientType }
  | { type: 'GET_CLIENT_FETCH_ERROR' }

  | { type: 'CREATE_CLIENT_FETCHING' }
  | { type: 'CREATE_CLIENT_FETCH'}
  | { type: 'CREATE_CLIENT_FETCH_ERROR' }

  | { type: 'DELETE_CLIENT_FETCHING' }
  | { type: 'DELETE_CLIENT_FETCH' }
  | { type: 'DELETE_CLIENT_FETCH_ERROR' }

  | { type: 'EDIT_CLIENT_FETCHING' }
  | { type: 'EDIT_CLIENT_FETCH' }
  | { type: 'EDIT_CLIENT_FETCH_ERROR' }

  | { type: 'GET_CLIENTS_BY_USER_ID_FETCHING' }
  | { type: 'GET_CLIENTS_BY_USER_ID_FETCH'; payload: Paginator<clientType> }
  | { type: 'GET_CLIENTS_BY_USER_ID_FETCH_ERROR' }

const reducer = (
  state = globalState,
  action: PosibleActions
): ClientsReducerPropsType => {
  switch (action.type) {
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

    case t.GET_CLIENT_FETCHING: {
      return {
        ...state,
        clientStatus: ServerStatus.FETCHING,
      }
    }
    case t.GET_CLIENT_FETCH: {
      return {
        ...state,
        clientStatus: ServerStatus.FETCH,
        client: action.payload,
      }
    }
    case t.GET_CLIENT_FETCH_ERROR: {
      return {
        ...state,
        clientStatus: ServerStatus.FETCH_ERROR,
      }
    }

    case t.CREATE_CLIENT_FETCHING: {
      return {
        ...state,
        clientCreateStatus: ServerStatus.FETCHING,
      }
    }
    case t.CREATE_CLIENT_FETCH: {
      return {
        ...state,
        clientCreateStatus: ServerStatus.FETCH,
      }
    }
    case t.CREATE_CLIENT_FETCH_ERROR: {
      return {
        ...state,
        clientCreateStatus: ServerStatus.FETCH_ERROR,
      }
    }

    case t.DELETE_CLIENT_FETCHING: {
      return {
        ...state,
        clientDeleteStatus: ServerStatus.FETCHING,
      }
    }
    case t.DELETE_CLIENT_FETCH: {
      return {
        ...state,
        clientDeleteStatus: ServerStatus.FETCH,
      }
    }
    case t.DELETE_CLIENT_FETCH_ERROR: {
      return {
        ...state,
        clientDeleteStatus: ServerStatus.FETCH_ERROR,
      }
    }

    case t.EDIT_CLIENT_FETCHING: {
      return {
        ...state,
        clientEditStatus: ServerStatus.FETCHING,
      }
    }
    case t.EDIT_CLIENT_FETCH: {
      return {
        ...state,
        clientEditStatus: ServerStatus.FETCH,
      }
    }
    case t.EDIT_CLIENT_FETCH_ERROR: {
      return {
        ...state,
        clientEditStatus: ServerStatus.FETCH_ERROR,
      }
    }

    case t.GET_CLIENTS_BY_USER_ID_FETCHING: {
      return {
        ...state,
        clientsByUserIdStatus: ServerStatus.FETCHING,
      }
    }
    case t.GET_CLIENTS_BY_USER_ID_FETCH: {
      return {
        ...state,
        clientsByUserIdStatus: ServerStatus.FETCH,
        clientsByUserId: action.payload,
      }
    }
    case t.GET_CLIENTS_BY_USER_ID_FETCH_ERROR: {
      return {
        ...state,
        clientsByUserIdStatus: ServerStatus.FETCH_ERROR,
      }
    }

    default:
      return {
        ...state,
      }
  }
}

export default reducer
