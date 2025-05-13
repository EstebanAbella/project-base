import "../styles/_index.scss"
import SessionProvider from "../wrappers/session/SessinProvider"
import type { AppProps } from "next/app"
import React from "react"
import { AuthProvider } from "../context/auth/AuthContext"
import { Popover } from "../components/Popover"

function MainApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
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
