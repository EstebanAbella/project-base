import React from "react"
import Button, { ButtonType } from "./Button"
import router from "next/router"

export type NavigationPropsType = {
  newRoute: string
  title: string
}

const Navigation = ({ newRoute, title }: NavigationPropsType) => {
  const handleClick = () => {
    router.push(newRoute)
  }

  return (
    <nav className={"navigation"} onClick={handleClick}>
      <span className='icon-chevronLeft'></span>
      <h5>{title}</h5>
    </nav>
  )
}

export default Navigation
