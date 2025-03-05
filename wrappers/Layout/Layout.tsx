import React from "react"
import { MenuComponent } from "../../components/Menu"
import { NavigationComponent } from "../../components/Navigation"

type LayoutPropsType = {
  children: JSX.Element | JSX.Element[]
}

export const Layout = ({ children }: LayoutPropsType): JSX.Element => {
  return (
    <section className={"layout"}>
      <MenuComponent />
      <div className='children'>
        <NavigationComponent />
        <section>{children}</section>
      </div>
    </section>
  )
}
