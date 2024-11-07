import React from "react"
import Button, { ButtonType } from "../Button"
import styles from "./Modal.module.scss"
import Loader from "../Loader"

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
  title,
  buttonCloseModal = false,
  loader = false,
}: ModalPropsType) => {
  return (
    <>
      {isDisabled ? (
        <section
          className={`${styles.modal} ${stateModal ? styles.open : styles.close}`}
        >
          <div className={`${styles.modalContainer}`}>
            <span
              className={`icon-close ${styles.close}`}
              onClick={() => setStateModal(false)}
            ></span>
            <div className={`${styles.modalContent}`}>
              {(text || title) && (
                <div className={`${styles.textModal}`}>
                  {title && <h5>{title}</h5>}
                  {text && text.map((data) => <p>{data}</p>)}
                </div>
              )}
              {img && <img src={img}></img>}
              {loader && <Loader></Loader>}
              {onClick && (
                <section className={`${styles.containerButtonModalCreate}`}>
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

export default Modal
