import React from "react"
import { Navigation } from "../../components/Navigation/Navigation"
import { Menu } from "../../components/Menu/Menu"

type LayoutPropsType = {
  children: JSX.Element | JSX.Element[]
}

export const Layout = ({ children }: LayoutPropsType): JSX.Element => {
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
