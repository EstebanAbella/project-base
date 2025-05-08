import React from "react"
import { ChangeTheme } from "../ChangeTheme/ChangeTheme"
import router from "next/router"
import { Button } from "../Button"
import { ButtonType } from "../Button/Button"
import { useAuthContext } from "../../context/auth/AuthContext"
import { ServerStatus } from "../../interface/global"
import LocalDataService from "../../services/LocalDataService"

export const MenuComponent = () => {
  const { setLoginStatus, setUser } = useAuthContext()
  return (
    <header>
      <Button
        value={"Users"}
        type={ButtonType.TERTIARY}
        icon={"icon-user"}
        onClick={() => router.push("/users")}
      ></Button>

      <Button
        value={"Clients"}
        type={ButtonType.TERTIARY}
        icon={"icon-user"}
        onClick={() => router.push("/clients")}
      ></Button>

      <Button
        value={"Logout"}
        type={ButtonType.TERTIARY}
        icon={"icon-log-in"}
        onClick={() => {
          setLoginStatus(ServerStatus.IDLE)
          setUser(null)
          LocalDataService.clearData()
          window.location.href = "/login"
        }}
      ></Button>

      <div className='changeThemeContainer'>
        <ChangeTheme></ChangeTheme>
        <span className='icon-dark-mode-svgrepo-com'></span>
      </div>
    </header>
  )
}
