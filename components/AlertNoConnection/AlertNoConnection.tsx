"use client"
import { useIsNavigationOnline } from "../../hooks/useIsNavigationOnline"

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
