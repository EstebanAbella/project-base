import React from "react"
import { RootState } from "../../redux/rootReducer"
import { loggedUser } from "../../Utils/Types/authModel"
import { connect } from "react-redux"
import styles from "./UserData.module.scss"

const mapStateToProps = (state: RootState) => {
  const authReducer = state.auth
  return {
    userLogged: authReducer.user,
  }
}

const mapDispatchToProps = {}

export type NavigationPropsType = {
  userLogged?: loggedUser | undefined
}

const Navigation = ({ userLogged }: NavigationPropsType) => {
  return (
    <nav className={`${styles.navigation}`}>
      <div className={`${styles.containerInfoUser}`}>
        <div className={`${styles.infoUser}`}>
          <p>{userLogged?.name}</p>
          <p>{userLogged?.email}</p>
        </div>

        <div className={`${styles.letterName}`}>
          <p>{userLogged?.name[0]}</p>
        </div>
      </div>
    </nav>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
