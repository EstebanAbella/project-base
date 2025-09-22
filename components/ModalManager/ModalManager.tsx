import React from "react"
import { ButtonType } from "../Button/Button"
import { Modal } from "../Modal/Modal"
import { ModalCrud } from "../ModalCrud"
import { ServerStatus } from "../../interface/global"

type OperationConfig = {
  title: string
  textButton: string
  onClick: (data: any) => void
  object?: any
  status?: ServerStatus | undefined
}

export type ModalPropsType = {
  setStateModal: (e: any) => void
  stateModal: { type: string; state: boolean }
  initialData?: any
  operations: {
    create: OperationConfig
    edit: OperationConfig
    delete: OperationConfig
  }
}

export const ModalManager = ({
  stateModal,
  setStateModal,
  initialData,
  operations,
}: ModalPropsType) => {
  const { type, state } = stateModal
  const resetStateModal = () => setStateModal({ type: "", state: false })

  if (state && type === "delete") {
    const op = operations.delete
    return (
      <Modal
        stateModal={stateModal}
        setStateModal={resetStateModal}
        title={op.title}
        textButton={op.textButton}
        typeButton={ButtonType.PRIMARY}
        onClick={() => op.onClick(initialData)}
        buttonCloseModal
        spanAlert='alert'
        status={op.status}
      />
    )
  }

  if (state && (type === "create" || type === "edit")) {
    const op = operations[type]
    return (
      <ModalCrud
        stateModal={stateModal}
        setStateModal={resetStateModal}
        dataForm={op.object}
        textButton={op.textButton}
        typeButton={
          type === "create" ? ButtonType.SUCCESS : ButtonType.INFORMATION
        }
        onClick={op.onClick}
        initialData={type === "edit" ? initialData : null}
        status={op.status}
      />
    )
  }
}
