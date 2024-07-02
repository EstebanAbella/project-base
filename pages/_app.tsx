import '../styles/_index.scss'
import SessionProvider from '../wrappers/session/SessinProvider'
import type { AppProps } from 'next/app'
import React from 'react'
import { wrapper } from '../redux/store'
import { Provider } from 'react-redux'

function MainApp({ Component, pageProps, ...rest }: AppProps): JSX.Element {
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  )
}

export default MainApp
