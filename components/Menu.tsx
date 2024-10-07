import React, { useState } from "react"
import { RootState } from "../redux/rootReducer"
import { doLogout } from "../redux/auth/actions"
import { connect } from "react-redux"
import Button, { ButtonType } from "./Button"
import ChangeTheme from "./ChangeTheme"

const mapStateToProps = (state: RootState) => {
  return {}
}

const mapDispatchToProps = {
  doLogout,
}

export type MenuPropsType = {
  doLogout: Function
}

const Menu = ({ doLogout }: MenuPropsType) => {
  return (
    <header>
      <Button
        value={"Training"}
        type={ButtonType.TERTIARY}
        icon={"icon-dumbbell-training"}
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

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
