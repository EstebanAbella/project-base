import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { RootState } from '../redux/rootReducer'
import { connect } from 'react-redux'
import AccessConsume from '../wrappers/auth/AccessConsume'

const mapStateToProps = (state: RootState) => {
  const updaterReducer = state.updater
  return {
    updateNeeded: updaterReducer.updateNeeded,
  }
}

const mapDispatchToProps = {}

export type UpdateAppPropsType = {
  updateNeeded: boolean
}

function UpdateApp({ updateNeeded }: UpdateAppPropsType) {
  const router = useRouter()

  useEffect(() => {
    if (!updateNeeded) {
      router.push('/home')
    }
  }, [])

  return (
    <AccessConsume>
      <div className="container-fluid update-app-body">
        <div className="container update-app-holder">
          <div className="row title">Actualización Pendiente</div>
          <div>
            <div className="row description top">
              Hemos realizado mejoras en la aplicación, es por eso que te
              solicitamos que la actualices con la última versión
            </div>
            <div className="row description">
              Podes hacerlo desde el botón Actualizar.
            </div>
          </div>
          <div className="image"></div>
          <button
            className="button"
            onClick={() => {
              router.push('/updater')
            }}
          >
            Actualizar
          </button>
        </div>
      </div>
    </AccessConsume>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateApp)
