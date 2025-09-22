import { useEffect, useState } from "react"
import LocalDataService from "../../services/LocalDataService"
import { ServerStatus } from "../../interface/global"
import router from "next/router"
import ApiService from "../../apiService/ApiService"
import { useAuthContext } from "../../context/auth/AuthContext"
import { useGetUserByToken } from "../../view/Login/useLoginData"

type SessionProviderProps = {
  children: JSX.Element | JSX.Element[]
}

const SessionProvider = ({ children }: SessionProviderProps) => {
  const [seeChildren, setSeeChildren] = useState<boolean>(false)
  const { loginStatus, setUser } = useAuthContext()
  const { useGetUserByTokenHandler } = useGetUserByToken()

  useEffect(() => {
    const token = LocalDataService.getInstance().getToken()
    if (!token) {
      LocalDataService.clearData()
      setUser(null)
      setSeeChildren(true)
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
      setSeeChildren(true)
      router.push("/login")
    }
    if (loginStatus === ServerStatus.FETCHING) {
      setSeeChildren(false)
    }
    if (loginStatus === ServerStatus.FETCH) {
      setSeeChildren(true)
    }
  }, [loginStatus])

  return seeChildren && <>{children}</>
}

export default SessionProvider
