import React from "react"
import Loader from "../Loader/Loader"
import { Button } from "../Button"
import { ButtonType } from "../Button/Button"

export type ModalPropsType = {
  img?: string
  text?: string[]
  title?: string
  textButton?: string
  typeButton?: ButtonType
  onClick?: (e: any) => void
  setStateModal: (e: any) => void | undefined
  stateModal: boolean
  isDisabled: boolean
  dataForm?: any
  initialData?: any
  buttonCloseModal?: boolean
  loader?: boolean
  spanAlert?: string
}

export const Modal = ({
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
  title,
  buttonCloseModal = false,
  loader = false,
  spanAlert,
}: ModalPropsType) => {
  return (
    <>
      {isDisabled ? (
        <section className={`modal ${stateModal ? "open" : "close"}`}>
          <div className={`modalContainer`}>
            <span
              className={`icon-close close`}
              onClick={() => setStateModal(false)}
            ></span>
            <div className={`modalContent`}>
              {(text || title) && (
                <div className={`textModal`}>
                  {title && <h5>{title}</h5>}
                  {text && text.map((data) => <p>{data}</p>)}
                </div>
              )}
              {spanAlert && (
                <div className={`containerSpan`}>
                  <span className={`icon-${spanAlert} ${spanAlert}`}></span>
                </div>
              )}
              {img && <img src={img}></img>}
              {loader && <Loader></Loader>}
              {onClick && (
                <section className={`containerButtonModalCreate`}>
                  {buttonCloseModal && (
                    <Button
                      value={"Cancel"}
                      onClick={() => setStateModal(false)}
                      type={ButtonType.SECONDARY}
                    ></Button>
                  )}
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
