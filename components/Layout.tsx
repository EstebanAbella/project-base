import React, { useEffect, useState } from "react"
import Navigation from "./Navigation"
import Menu from "./Menu"

type LayoutPropsType = {
  children: JSX.Element | JSX.Element[]
  isNavigation?: boolean
  title?: string
  newRoute?: string
}

const Layout = ({
  children,
  newRoute,
  title,
  isNavigation,
}: LayoutPropsType): JSX.Element => {
  return (
    <section className={"layout"}>
      <Menu />
      <div className='containerLayout'>
        {/* {isNavigation && newRoute && title && (
          <Navigation newRoute={newRoute} title={title}></Navigation>
        )} */}
        <section className='children'>{children}</section>
      </div>
    </section>
  )
}

export default Layout
