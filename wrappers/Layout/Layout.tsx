import React from "react"
import { MenuComponent } from "../../components/Menu"
import { NavigationComponent } from "../../components/Navigation"
import { AlertNoConnectionComponent } from "../../components/AlertNoConnection/AlertNoConnection"

type LayoutPropsType = {
  children: JSX.Element | JSX.Element[]
}

export const Layout = ({ children }: LayoutPropsType): JSX.Element => {
  return (
    <section className={"layout"}>
      <AlertNoConnectionComponent />
      <MenuComponent />
      <div className='children'>
        <NavigationComponent />
        <section>{children}</section>
      </div>
    </section>
  )
}
