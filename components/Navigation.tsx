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
      <div className={"containerNavigation"} onClick={handleClick}>
        <span className='icon-arrow-left'></span>
        <h5>{title}</h5>
      </div>
    </nav>
  )
}

export default Navigation
