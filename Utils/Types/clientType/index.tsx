import { ServerStatus } from '../global'

export type clientType = {
  name: string
  address: string
  email: string
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
  client?: clientType
  clients?: Array<clientType>
  clientsByUser?: Array<clientType>
}
