"use client"
import React, { useEffect, useState } from "react"
import LocalDataService from "../../services/LocalDataService"
import { ServerStatus } from "../../interface/global"
import { useAuthContext } from "../../context/auth/AuthContext"

type AccessConsumePropsType = {
  children: React.ReactNode
}

const AccessConsume = ({ children }: AccessConsumePropsType): any => {
  const [canAccess, setCanAccess] = useState(false)

  const { loginStatus, setUser } = useAuthContext()

  useEffect(() => {
    if (loginStatus === ServerStatus.FETCH_ERROR) {
      setCanAccess(false)
      setUser(null)
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

export default AccessConsume
