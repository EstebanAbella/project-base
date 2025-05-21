import { useEffect, useState } from "react"
import LocalDataService from "../../services/LocalDataService"
import { ServerStatus } from "../../interface/global"
import router from "next/router"
import ApiService from "../../api/ApiService"
import { useAuthContext } from "../../context/auth/AuthContext"
import { useGetUserByToken } from "../../view/Login/useLoginData"

type SessionProviderProps = {
  children: JSX.Element | JSX.Element[]
}

const SessionProvider = ({ children }: SessionProviderProps) => {
  const [isToken, setIsToken] = useState<boolean>(false)
  const { loginStatus, setUser } = useAuthContext()
  const { useGetUserByTokenHandler } = useGetUserByToken()

  useEffect(() => {
    const token = LocalDataService.getInstance().getToken()
    if (!token) {
      setIsToken(true)
      router.push("/login")
    }
    if (token) {
      ApiService.setToken(token)
      useGetUserByTokenHandler(token)
    }
  }, [])

  useEffect(() => {
    if (loginStatus === ServerStatus.FETCH_ERROR) {
      LocalDataService.clearData()
      setUser(null)
      setIsToken(true)
      router.push("/login")
    }
    if (loginStatus === ServerStatus.FETCHING) {
      setIsToken(false)
    }
    if (loginStatus === ServerStatus.FETCH) {
      setIsToken(true)
    }
  }, [loginStatus])

  return isToken && <>{children}</>
}

export default SessionProvider
