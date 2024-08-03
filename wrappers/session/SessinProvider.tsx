import { PropsWithChildren, useEffect, useState } from 'react'
import { RootState } from '../../redux/rootReducer'
import LocalDataService from '../../services/LocalDataService'
import { connect } from 'react-redux'

import { getUserByToken } from '../../redux/auth/actions'
import { ServerStatus } from '../../Utils/Types/global'
import { checkUpdater } from '../../redux/updater/actions'
import router, { useRouter } from 'next/router'
import ApiService from '../../services/apiService/ApiService'

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
  useEffect(() => {
    // checkUpdater()
    const token = LocalDataService.getInstance().getToken()
    if (token) {
      ApiService.setToken(token)
      if (getUserByToken) getUserByToken()
    }
    if (!token && loginStatus !== ServerStatus.FETCH) {
      router.push('/login')
    }
  }, [])

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

  return <>{children}</>
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionProvider)
