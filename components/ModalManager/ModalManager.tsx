import React from "react"
import { ButtonType } from "../Button/Button"
import { Modal } from "../Modal/Modal"
import { ModalCrud } from "../ModalCrud"

export type ModalPropsType = {
  setStateModal: (e: any) => void | undefined
  stateModal: {
    type: string
    state: boolean
  }
  initialData?: any
  handleClickDelete: (data: any) => void
  handleClickCreate: (data: any) => void
  handleClickEdit: (data: any) => void
  createObject: any
  editObject: any
  title: { delete: string; create: string; update: string }
  textButton: { delete: string; create: string; update: string }
}

export const ModalManager = ({
  stateModal,
  setStateModal,
  initialData,
  handleClickDelete,
  handleClickCreate,
  handleClickEdit,
  createObject,
  editObject,
  title,
  textButton,
}: ModalPropsType) => {
  const { type, state } = stateModal

  const resetStateModal = () => {
    setStateModal({ type: "", state: false })
  }

  if (type === "delete" && !!state) {
    return (
      <Modal
        stateModal={stateModal}
        setStateModal={resetStateModal}
        title={title.delete}
        textButton={textButton.delete}
        typeButton={ButtonType.PRIMARY}
        onClick={() => handleClickDelete(initialData)}
        buttonCloseModal={true}
        spanAlert={"alert"}
      />
    )
  }

  if ((type === "create" || type === "edit") && !!state) {
    return (
      <ModalCrud
        stateModal={stateModal}
        setStateModal={resetStateModal}
        dataForm={type === "create" ? createObject : editObject}
        textButton={type === "create" ? textButton.create : textButton.update}
        typeButton={
          type === "create" ? ButtonType.SUCCESS : ButtonType.INFORMATION
        }
        onClick={type === "create" ? handleClickCreate : handleClickEdit}
        initialData={initialData}
      />
    )
  }
}
