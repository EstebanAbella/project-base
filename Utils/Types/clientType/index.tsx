import { ServerStatus } from '../global'

export type clientListType = {
  name: string
  address: string
  id: string
  userId: string
}

export type ClientsReducerPropsType = {
  clientsStatus: ServerStatus
  clientStatus: ServerStatus
  clientsByUserStatus: ServerStatus
  clientCreateStatus: ServerStatus
  clientDeleteStatus: ServerStatus
  clientEditStatus: ServerStatus
  client?: clientListType
  clients?: Array<clientListType>
  clientsByUser?: Array<clientListType>
}
