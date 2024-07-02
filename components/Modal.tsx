import React, { useEffect, useState } from 'react'
import Button from './Button'
import { StaticImageData } from 'next/image'

export type ModalPropsType = {
  img?: string
  text?: { name: string; alias: string; cbu: string } | ''
  textButton?: string
  setStateModal: (e: any) => void
  stateModal: boolean
  onClick?: (e: any) => void
}

const Modal = ({
  img,
  text,
  textButton,
  stateModal,
  setStateModal,
  onClick,
}: ModalPropsType) => {
  return (
    <section className={`modal ${stateModal ? 'open' : 'close'}`}>
      <div className="modalContainer">
        <div className="modalContent">
          <span
            className="icon-close close"
            onClick={() => setStateModal(false)}
          ></span>
          {img && <img src={img}></img>}
          {text && (
            <div className="textModal">
              <p>Datos para la transferencia:</p>
              <p>Nombre: {text.name}</p>
              <p>CBU: {text.cbu}</p>
              <p>Alias: {text.alias}</p>
            </div>
          )}
          {textButton && <Button value={textButton} onClick={onClick}></Button>}
        </div>
      </div>
    </section>
  )
}

export default Modal
