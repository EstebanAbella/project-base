import React from 'react'
import Button from './Button'

export type MenuPropsType = {
  doLogout: Function
  onMenu: boolean
}

const Menu = ({ doLogout, onMenu }: MenuPropsType) => {
  const handleClick = () => {
    doLogout()
  }

  return (
    <aside className={onMenu ? 'onMenu' : 'offMenu'}>
      <Button
        value={'Cerrar Sesion'}
        onClick={handleClick}
        icon="icon-exit"
      ></Button>
    </aside>
  )
}

export default Menu
