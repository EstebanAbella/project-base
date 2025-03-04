import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { RootState } from "../../redux/rootReducer"
import { useSelector } from "react-redux"
import AccessConsume from "../../wrappers/auth/AccessConsume"

export const UpdateApp = () => {
  const router = useRouter()
  const updateNeeded = useSelector(
    (state: RootState) => state.updater.updateNeeded
  )

  useEffect(() => {
    if (!updateNeeded) {
      router.push("/home")
    }
  }, [])

  return (
    <AccessConsume>
      <div className='container-fluid update-app-body'>
        <div className='container update-app-holder'>
          <div className='row title'>Actualización Pendiente</div>
          <div>
            <div className='row description top'>
              Hemos realizado mejoras en la aplicación, es por eso que te
              solicitamos que la actualices con la última versión
            </div>
            <div className='row description'>
              Podes hacerlo desde el botón Actualizar.
            </div>
          </div>
          <div className='image'></div>
          <button
            className='button'
            onClick={() => {
              router.push("/updater")
            }}
          >
            Actualizar
          </button>
        </div>
      </div>
    </AccessConsume>
  )
}
