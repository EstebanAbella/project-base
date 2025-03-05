import { PropsWithChildren, useEffect, useState } from "react"
import { RootState } from "../../redux/rootReducer"
import LocalDataService from "../../services/LocalDataService"
import { connect } from "react-redux"
import { getUserByToken } from "../../redux/auth/actions"
import { ServerStatus } from "../../interface/global"
import { checkUpdater } from "../../redux/updater/actions"
import router, { useRouter } from "next/router"
import ApiService from "../../services/apiService/ApiService"

const mapStateToProps = (state: RootState) => {
  const updaterReducer = state.updater
  const authReducer = state.auth
  return {
    loginStatus: authReducer.loginStatus,
    updateNeeded: updaterReducer.updateNeeded,
    updaterCheckerStatus: updaterReducer.updaterCheckerStatus,
  }
}

const mapDispatchToProps = {
  getUserByToken,
  checkUpdater,
}

export type SessinProviderProps = PropsWithChildren<{
  loginStatus: ServerStatus
  getUserByToken: Function
  checkUpdater: Function
  updateNeeded: boolean
  updaterCheckerStatus: ServerStatus
}>

const SessionProvider = ({
  loginStatus,
  children,
  getUserByToken,
  checkUpdater,
  updateNeeded,
  updaterCheckerStatus,
}: SessinProviderProps) => {
  const [isToken, setIsToken] = useState<boolean>(false)

  useEffect(() => {
    // checkUpdater()
    const token = LocalDataService.getInstance().getToken()
    if (!token) {
      setIsToken(true)
      router.push("/login")
    }
    if (token) {
      ApiService.setToken(token)
      getUserByToken()
      // setIsToken(true)
    }
  }, [])

  useEffect(() => {
    if (loginStatus === ServerStatus.FETCH_ERROR) {
      LocalDataService.clearData()
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

  // useEffect(() => {
  //   if (loginStatus === ServerStatus.FETCH && updateNeeded) {
  //     router.push('/updateApp')
  //   }
  // }, [loginStatus, updaterCheckerStatus])

  // useEffect(() => {
  //   if (loginStatus === ServerStatus.FETCH && !updateNeeded) {
  //     surveyCall()
  //   }
  // }, [loginStatus])

  return isToken && <>{children}</>
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionProvider)
