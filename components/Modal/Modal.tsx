import React from "react"
import Image from "next/image"
import { Button } from "../Button"
import { ButtonType } from "../Button/Button"
import { ServerStatus } from "../../interface/global"

export type ModalPropsType = {
  img?: string
  text?: string[]
  title?: string
  textButton?: string
  typeButton?: ButtonType
  onClick?: (e: any) => void
  setStateModal: (e: any) => void | undefined
  stateModal: {
    type: string
    state: boolean
  }
  buttonCloseModal?: boolean
  status: ServerStatus | undefined
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
  title,
  buttonCloseModal = false,
  status,
  spanAlert,
}: ModalPropsType) => {
  return (
    <>
      <section className={`modal ${stateModal.state ? "open" : "close"}`}>
        <div className={`modalContainer`}>
          <span className={`icon-close close`} onClick={setStateModal}></span>
          <div className={`modalContent`}>
            {(text || title) && (
              <div className={`textModal`}>
                {title && <h5>{title}</h5>}
                {text && text.map((data, index) => <p key={index}>{data}</p>)}
              </div>
            )}
            {spanAlert && (
              <div className={`containerSpan`}>
                <span className={`icon-${spanAlert} ${spanAlert}`}></span>
              </div>
            )}
            {img && (
              <Image src={img} alt='Image Modal' width={100} height={100} />
            )}
            {onClick && (
              <section className={`containerButtonModalCreate`}>
                {buttonCloseModal && (
                  <Button
                    value={"Cancel"}
                    onClick={setStateModal}
                    type={ButtonType.SECONDARY}
                  ></Button>
                )}
                <Button
                  value={
                    status !== ServerStatus.FETCHING ? textButton : "Loading"
                  }
                  onClick={(e) => onClick(e)}
                  type={typeButton}
                  disabled={status === ServerStatus.FETCHING}
                ></Button>
              </section>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
