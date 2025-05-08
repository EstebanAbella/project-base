import React, { useEffect } from "react"
import { useIsNavigationOnline } from "../../hooks/useIsNavigationOnline"

export const AlertNoConnectionComponent = () => {
  const isOnline = useIsNavigationOnline()
  useEffect(() => {
    // TODO
    //emit event for the component that is listening to it
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
