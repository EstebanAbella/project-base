import React, { createContext, useContext, useState } from "react"
import { AuthContextType } from "./AuthContext.interface"
import { ServerStatus } from "../../interface/global"
import { loggedUser } from "../../interface/authModel.interface"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<loggedUser | null>(null)
  const [loginStatus, setLoginStatus] = useState<ServerStatus>(
    ServerStatus.IDLE
  )
  const [restorePasswordStatus, setRestorePasswordStatus] =
    useState<ServerStatus>(ServerStatus.IDLE)
  const [restorePasswordValidatedStatus, setRestorePasswordValidatedStatus] =
    useState<ServerStatus>(ServerStatus.IDLE)
  const [authUserByTokenStatus, setAuthUserByTokenStatus] =
    useState<ServerStatus>(ServerStatus.IDLE)

  return (
    <AuthContext.Provider
      value={{
        user,
        loginStatus,
        restorePasswordStatus,
        restorePasswordValidatedStatus,
        authUserByTokenStatus,
        setUser,
        setLoginStatus,
        setRestorePasswordStatus,
        setRestorePasswordValidatedStatus,
        setAuthUserByTokenStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider")
  }
  return context
}
