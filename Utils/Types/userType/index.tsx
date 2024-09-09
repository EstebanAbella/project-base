import { Paginator, ServerStatus } from '../global'

export type UserResult = {
  name: string
  id: string
  email: string
  role: string
}

export type UsersReducerPropsTypes = {
  usersStatus: ServerStatus
  userStatus: ServerStatus
  userCreateStatus: ServerStatus
  userDeleteStatus: ServerStatus
  userEditStatus: ServerStatus
  user?: UserResult
  users?: Paginator<UserResult>
}
