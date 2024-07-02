import React, { useEffect, useState } from 'react'
import Header from './Header'
import Navigation from './Navigation'

type LayoutPropsType = {
  children: JSX.Element | JSX.Element[]
  isNavigation: boolean
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
    <section
      className={'layout'}
      style={{ paddingTop: `${isNavigation ? '17vh' : '15vh'}` }}
    >
      <div className="containerMenu">
        <Header
          activePointNotification={true}
          user={{
            firstName: 'Prueba',
            lastName: 'Test',
          }}
        ></Header>
        {isNavigation && newRoute && title && (
          <Navigation newRoute={newRoute} title={title}></Navigation>
        )}
      </div>
      <section className="children">{children}</section>
    </section>
  )
}

export default Layout
