import "../styles/_index.scss"
import SessionProvider from "../wrappers/session/SessinProvider"
import { AuthProvider } from "../context/auth/AuthContext"
import { Popover } from "../components/Popover"
import type { Metadata, Viewport } from "next"
import React from "react"
import { Roboto } from "next/font/google"

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Project-Base",
  description: "App",
  applicationName: "Project-Base",
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon-logo-background.png",
  },
  appleWebApp: {
    capable: true,
    title: "Project-Base",
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    title: "Project-Base",
    description: "Project-Base",
    siteName: "Project-Base",
  },
  twitter: {
    card: "summary",
    title: "Project-Base",
    description: "Project-Base",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={roboto.className}>
        <Popover />
        <AuthProvider>
          <SessionProvider>{children}</SessionProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
