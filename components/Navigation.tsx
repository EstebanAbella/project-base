import React from 'react'
import Button, { ButtonType } from './Button'
import router from 'next/router'

export type NavigationPropsType = {
  newRoute: string
  title: string
}

const Navigation = ({ newRoute, title }: NavigationPropsType) => {
  const handleClick = () => {
    router.push(newRoute)
  }
  return (
    <nav className={'navigation'}>
      <span onClick={handleClick} className="icon-chevronLeft"></span>
      <h2>{title}</h2>
    </nav>
  )
}

export default Navigation
