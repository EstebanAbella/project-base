import React, { useEffect } from "react"
import { useIsNavigationOnline } from "../../hooks/useIsNavigationOnline"
import NotificationService from "../../services/NotificationService"

export const AlertNoConnectionComponent = () => {
  const isOnline = useIsNavigationOnline()
  return (
    <section
      className={`alertConnection ${
        isOnline ? " connection " : "noConnection"
      }`}
    >
      Sin conexión
    </section>
  )
}
