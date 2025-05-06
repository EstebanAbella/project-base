import { useState } from "react"
import { ServerStatus } from "../../interface/global"
import { authService } from "../../services/services/authenticationService"
import { loggedUser } from "../../interface/authModel.interface"

export const useDoLogin = () => {
  const [data, setData] = useState<loggedUser | void>()
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (email: string, password: string) => {
    setStatus(ServerStatus.FETCHING)
    try {
      const response = await authService.doLogin(email, password)
      setData(response)
      setStatus(ServerStatus.FETCH)
    } catch (err: any) {
      console.error("Error login:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useLoginHandler: handler,
    useLoginData: data,
    useLoginStatus: status,
  }
}

export const useDoRestorePassword = () => {
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (data: {
    email: string
    location: string
    backoffice: boolean
  }) => {
    setStatus(ServerStatus.FETCHING)
    try {
      await authService.doRestorePassword(data)
      setStatus(ServerStatus.FETCH)
    } catch (err: any) {
      console.error("Error restore password:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useRestorePasswordHandler: handler,
    useRestorePasswordStatus: status,
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
  const [data, setData] = useState<loggedUser | null>(null)
  const [status, setStatus] = useState<ServerStatus>()

  const handler = async (token: string) => {
    setStatus(ServerStatus.FETCHING)
    try {
      const user = await authService.getUserByToken(token)
      setData(user)
      setStatus(ServerStatus.FETCH)
    } catch (err: any) {
      console.error("Error get user by token:", err)
      setStatus(ServerStatus.FETCH_ERROR)
    }
  }

  return {
    useGetUserByTokenHandler: handler,
    useGetUserByTokenData: data,
    useGetUserByTokenStatus: status,
  }
}
