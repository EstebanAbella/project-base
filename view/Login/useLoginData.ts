import { useState } from "react"
import { ServerStatus } from "../../interface/global"
import { authService } from "../../services/services/authenticationService"
import { useAuthContext } from "../../context/auth/AuthContext"
import LocalDataService from "../../services/LocalDataService"

export const useDoLogin = () => {
  const { user, setUser, loginStatus, setLoginStatus } = useAuthContext()

  const handler = async (email: string, password: string) => {
    setLoginStatus(ServerStatus.FETCHING)
    try {
      const response = await authService.doLogin(email, password)
      setUser(response || null)
      setLoginStatus(ServerStatus.FETCH)
    } catch (err: any) {
      console.error("Error login:", err)
      setLoginStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useLoginHandler: handler,
    useLoginData: user,
    useLoginStatus: loginStatus,
  }
}

export const useDoRestorePassword = () => {
  const { setRestorePasswordStatus, restorePasswordStatus } = useAuthContext()

  const handler = async (data: {
    email: string
    location: string
    backoffice: boolean
  }) => {
    setRestorePasswordStatus(ServerStatus.FETCHING)
    try {
      await authService.doRestorePassword(data)
      setRestorePasswordStatus(ServerStatus.FETCH)
    } catch (err: any) {
      console.error("Error restore password:", err)
      setRestorePasswordStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useRestorePasswordHandler: handler,
    useRestorePasswordStatus: restorePasswordStatus,
  }
}

export const useDoRestorePasswordValidated = () => {
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (data: { newPassword: string; token: string }) => {
    setStatus(ServerStatus.FETCHING)
    try {
      await authService.doRestorePasswordValidated(data)
      setStatus(ServerStatus.FETCH)
    } catch (err: any) {
      console.error("Error restore password validated:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useRestorePasswordValidatedHandler: handler,
    useRestorePasswordValidatedStatus: status,
  }
}

export const useGetUserByToken = () => {
  const { user, setUser, loginStatus, setLoginStatus } = useAuthContext()

  const handler = async (token: string) => {
    setLoginStatus(ServerStatus.FETCHING)
    try {
      const userData = await authService.getUserByToken(token)
      setUser(userData)
      LocalDataService.getInstance().saveUser(userData)
      setLoginStatus(ServerStatus.FETCH)
    } catch (err: any) {
      console.error("Error get user by token:", err)
      LocalDataService.clearData()
      setUser(null)
      setLoginStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useGetUserByTokenHandler: handler,
    useGetUserByTokenData: user,
    useGetUserByTokenStatus: loginStatus,
  }
}
