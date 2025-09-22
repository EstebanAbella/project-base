import "../styles/_index.scss"
import SessionProvider from "../wrappers/session/SessinProvider"
import type { AppProps } from "next/app"
import React from "react"
import { AuthProvider } from "../context/auth/AuthContext"
import { Popover } from "../components/Popover"
import Head from "next/head"

function MainApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </Head>
      <Popover />
      <AuthProvider>
        <SessionProvider>
          <Component {...pageProps} />
        </SessionProvider>
      </AuthProvider>
    </>
  )
}

export default MainApp
