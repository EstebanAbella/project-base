import React, { useEffect, useState } from "react"
import { connect } from "react-redux"
import { RootState } from "../../redux/rootReducer"
import LocalDataService from "../../services/LocalDataService"
import { ServerStatus } from "../../interface/global"
import { checkUpdater } from "../../redux/updater/actions"

const mapStateToProps = (state: RootState) => {
  const authReducer = state.auth
  return {
    loginStatus: authReducer.loginStatus,
  }
}

const mapDispatchToProps = {
  checkUpdater,
}

type AccessConsumePropsType = {
  children: JSX.Element | JSX.Element[]
  loginStatus: ServerStatus
}

const AccessConsume = ({
  children,
  loginStatus,
}: AccessConsumePropsType): any => {
  const [canAccess, setCanAccess] = useState(false)

  useEffect(() => {
    if (loginStatus === ServerStatus.FETCH_ERROR) {
      setCanAccess(false)
      LocalDataService.clearData()
      window.location.href = "/login"
    }
    if (loginStatus === ServerStatus.FETCHING) {
      setCanAccess(false)
    }
    if (loginStatus === ServerStatus.FETCH) {
      setCanAccess(true)
    }
  }, [loginStatus])

  return canAccess ? children : <div></div>
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessConsume)
