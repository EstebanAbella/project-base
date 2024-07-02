import { ServerStatus } from '../global'

export type loggedUser = {
  name: string
  id: string
  email: string
  password: string
  role: string
  token?: string
}

export type AuthReducerPropsType = {
  loginStatus: ServerStatus
  user?: loggedUser
  loginStatusMessage?: string
  restorePasswordStatus: ServerStatus
  restorePasswordValidatedStatus: ServerStatus
  authUserByTokenStatus: ServerStatus
  userByToken?: loggedUser
}
