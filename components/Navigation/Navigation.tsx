import React from "react"
import { RootState } from "../../redux/rootReducer"
import { loggedUser } from "../../Utils/Types/authModel"
import { connect } from "react-redux"

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

const NavigationComponent = ({ userLogged }: NavigationPropsType) => {
  return (
    <nav className='navigation'>
      <div className='containerInfoUser'>
        <div className='infoUser'>
          <p>{userLogged?.name}</p>
          <p>{userLogged?.email}</p>
        </div>

        <div className='letterName'>
          <p>{userLogged?.name[0]}</p>
        </div>
      </div>
    </nav>
  )
}

export const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationComponent)
