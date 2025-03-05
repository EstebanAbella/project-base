import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useIsNavigationOnline } from "../../hooks/useIsNavigationOnline"
import { isNavigationOnline } from "../../redux/isNavigationOnline/actions"
import { AppDispatch } from "../../redux/store"

export const AlertNoConnectionComponent = () => {
  const dispatch = useDispatch<AppDispatch>()

  const isOnline = useIsNavigationOnline()
  useEffect(() => {
    dispatch(isNavigationOnline(isOnline))
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
