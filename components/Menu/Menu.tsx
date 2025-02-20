import React from "react"
import { RootState } from "../../redux/rootReducer"
import { doLogout } from "../../redux/auth/actions"
import { connect } from "react-redux"
import { ChangeTheme } from "../ChangeTheme/ChangeTheme"
import router from "next/router"
import { Button } from "../Button"
import { ButtonType } from "../Button/Button"

const mapStateToProps = (state: RootState) => {
  return {}
}

const mapDispatchToProps = {
  doLogout,
}

export type MenuPropsType = {
  doLogout: Function
}

const MenuComponent = ({ doLogout }: MenuPropsType) => {
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
        onClick={() => doLogout()}
      ></Button>

      <div className='changeThemeContainer'>
        <ChangeTheme></ChangeTheme>
        <span className='icon-dark-mode-svgrepo-com'></span>
      </div>
    </header>
  )
}

export const Menu = connect(mapStateToProps, mapDispatchToProps)(MenuComponent)
