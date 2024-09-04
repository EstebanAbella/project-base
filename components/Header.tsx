import React, { useState } from 'react'
import { Logo } from './Logo'
import { RootState } from '../redux/rootReducer'
import { doLogout } from '../redux/auth/actions'
import { connect } from 'react-redux'
import Menu from './Menu'
import AlertNoConnection from './AlertNoConnection'

const mapStateToProps = (state: RootState) => {
  return {}
}

const mapDispatchToProps = {
  doLogout,
}

export type HeaderPropsType = {
  doLogout: Function
}

const Header = ({
  doLogout,
}: HeaderPropsType) => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <>
      <AlertNoConnection />
      <header>
        <Logo width="80px" srcLogo={''}></Logo>

        <div className="containerAvatar">
          <div className="avatar" onClick={() => setShowMenu(!showMenu)}>
          </div>
        </div>
      </header>

      <Menu doLogout={doLogout} onMenu={showMenu} />
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
