import React, { useState } from 'react'
import { VipoLogo } from './VipoLogo'
import { RootState } from '../redux/rootReducer'
import { doLogout } from '../redux/auth/actions'
import { connect } from 'react-redux'
import Menu from './Menu'
import AlertNoConnection from './AlertNoConnection'

const mapStateToProps = (state: RootState) => {}

const mapDispatchToProps = {
  doLogout,
}

export type HeaderPropsType = {
  activePointNotification: boolean
  user: { firstName: string; lastName: string }
  doLogout: Function
}

const Header = ({
  activePointNotification,
  user,
  doLogout,
}: HeaderPropsType) => {
  const [showMenu, setShowMenu] = useState(false)
  return (
    <>
      <AlertNoConnection />
      <header>
        <VipoLogo width="80px"></VipoLogo>

        <div className="containerAvatar">
          <div className="avatar" onClick={() => setShowMenu(!showMenu)}>
            {user?.firstName?.[0] + user?.lastName?.[0]}
          </div>
          {activePointNotification && <div className="pointNotification"></div>}
        </div>
      </header>

      <Menu doLogout={doLogout} onMenu={showMenu} />
    </>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
