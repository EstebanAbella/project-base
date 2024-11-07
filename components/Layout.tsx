import React from "react"
import Navigation from "./UserData"
import Menu from "./Menu"

type LayoutPropsType = {
  children: JSX.Element | JSX.Element[]
}

const Layout = ({ children }: LayoutPropsType): JSX.Element => {
  return (
    <section className={"layout"}>
      <Menu />
      <div className='children'>
        <Navigation></Navigation>
        <section>{children}</section>
      </div>
    </section>
  )
}

export default Layout
