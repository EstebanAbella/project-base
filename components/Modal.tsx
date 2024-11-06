import React from "react"
import Button, { ButtonType } from "./Button"

export type ModalPropsType = {
  img?: string
  text?: []
  textButton?: string
  typeButton?: ButtonType
  onClick?: (e: any) => void
  setStateModal: (e: any) => void | undefined
  stateModal: boolean
  isDisabled: boolean
  dataForm: any
  initialData?: any
}

const Modal = ({
  img,
  text,
  textButton,
  typeButton,
  stateModal,
  setStateModal,
  onClick,
  isDisabled,
  dataForm,
  initialData,
}: ModalPropsType) => {
  return (
    <>
      {isDisabled ? (
        <section className={`modal ${stateModal ? "open" : "close"}`}>
          <div className='modalContainer'>
            <span
              className='icon-close close'
              onClick={() => setStateModal(false)}
            ></span>
            <div className='modalContent'>
              {img && <img src={img}></img>}
              {text && (
                <div className='textModal'>
                  {text.map((data) => (
                    <p>{data}</p>
                  ))}
                </div>
              )}
              {onClick && (
                <section className={"containerButtonModalCreate"}>
                  <Button
                    value={textButton}
                    onClick={(e) => onClick(e)}
                    type={typeButton}
                  ></Button>
                </section>
              )}
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  )
}

export default Modal
