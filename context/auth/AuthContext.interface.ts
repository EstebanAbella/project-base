import { loggedUser } from "../../interface/authModel.interface"
import { ServerStatus } from "../../interface/global"

export interface AuthContextType {
  user: loggedUser | null
  loginStatus: ServerStatus
  restorePasswordStatus: ServerStatus
  restorePasswordValidatedStatus: ServerStatus
  authUserByTokenStatus: ServerStatus
  setUser: (user: loggedUser | null) => void
  setLoginStatus: (status: ServerStatus) => void
  setRestorePasswordStatus: (status: ServerStatus) => void
  setRestorePasswordValidatedStatus: (status: ServerStatus) => void
  setAuthUserByTokenStatus: (status: ServerStatus) => void
}
