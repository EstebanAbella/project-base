import React, { useEffect } from "react"
import { useIsNavigationOnline } from "../../hooks/useIsNavigationOnline"

export const AlertNoConnectionComponent = () => {
  const isOnline = useIsNavigationOnline()
  useEffect(() => {
    //
  }, [isOnline])
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
