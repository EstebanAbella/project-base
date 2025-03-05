import React from "react"
import { doLogout } from "../../redux/auth/actions"
import { useDispatch } from "react-redux"
import { ChangeTheme } from "../ChangeTheme/ChangeTheme"
import router from "next/router"
import { Button } from "../Button"
import { ButtonType } from "../Button/Button"
import { AppDispatch } from "../../redux/store"

export const MenuComponent = () => {
  const dispatch = useDispatch<AppDispatch>()
  return (
    <header>
      <Button
        value={"Training"}
        type={ButtonType.TERTIARY}
        icon={"icon-dumbbell-training"}
        onClick={() => router.push("/botTraining")}
      ></Button>

      <Button
        value={"Logout"}
        type={ButtonType.TERTIARY}
        icon={"icon-log-in"}
        onClick={() => dispatch(doLogout())}
      ></Button>

      <div className='changeThemeContainer'>
        <ChangeTheme></ChangeTheme>
        <span className='icon-dark-mode-svgrepo-com'></span>
      </div>
    </header>
  )
}
