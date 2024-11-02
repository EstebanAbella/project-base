import React, { useEffect, useState } from "react"
import Button, { ButtonType } from "./Button"
import TextFieldModalCrud, { TextFieldType } from "./TextFieldModalCrud"
import TagInput from "./TagInput"
import AdditionalActionsInput from "./AdditionalActionsInput"

export type ModalPropsType = {
  img?: string
  text?: []
  textButton?: string
  typeButton?: ButtonType
  onClick?: (e: any) => void
  setStateModal: (e: any) => void | undefined
  stateModal: boolean
  dataForm: Array<dataFormType>
  isDisabled: boolean
  initialData?: any
}

export type dataFormType = {
  label: string
  name: string
  typeTextField: TextFieldType
  disabled: boolean
  type: string
  placeholder: string
  valueSelect?: string[]
  defaultValue?: any
}

const componentByChoice = {
  tagInput: (props: any) => <TagInput {...props} />,
  text: (props: any) => <TextFieldModalCrud {...props} />,
  number: (props: any) => <TextFieldModalCrud {...props} />,
  select: (props: any) => <TextFieldModalCrud {...props} />,
  textarea: (props: any) => <TextFieldModalCrud {...props} />,
  additional_actions: (props: any) => <AdditionalActionsInput {...props} />,
}

const Modal = ({
  img,
  text,
  textButton,
  typeButton,
  stateModal,
  setStateModal,
  onClick,
  dataForm,
  isDisabled,
  initialData,
}: ModalPropsType) => {
  const [form, setForm] = useState<any>()

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    } else {
      const emptyForm = Object.fromEntries(
        dataForm.map((item: any) => [item.name, ""])
      )
      setForm(emptyForm)
    }
  }, [initialData, dataForm])

  useEffect(() => {
    console.log("AAA", form)
  }, [form])

  const handleChange = (fieldValue: {
    [key: string]: string | number | []
  }) => {
    setForm((prevForm: any) => ({ ...prevForm, ...fieldValue }))
  }

  const propsByType = (data: any) => {
    const value = {
      tagInput: {
        label: data.label,
        name: data.name,
        disabled: data.disabled,
        value: form[data.name] ? form[data.name] : [],
        onChange: handleChange,
        placeholder: data.placeholder,
      },
      text: {
        label: data.label,
        name: data.name,
        typeTextField: data.typeTextField,
        disabled: data.disabled,
        type: data.type,
        placeholder: data.placeholder,
        onChange: handleChange,
        valueInput: form[data.name] ? form[data.name] : "",
        valueSelect: data.valueSelect ? data.valueSelect : [],
        key: data.name,
      },
      number: {
        label: data.label,
        name: data.name,
        typeTextField: data.typeTextField,
        disabled: data.disabled,
        type: data.type,
        placeholder: data.placeholder,
        onChange: handleChange,
        valueInput: form[data.name] ? form[data.name] : "",
        valueSelect: data.valueSelect ? data.valueSelect : [],
        key: data.name,
      },
      select: {
        label: data.label,
        name: data.name,
        typeTextField: data.typeTextField,
        disabled: data.disabled,
        type: data.type,
        placeholder: data.placeholder,
        onChange: handleChange,
        valueInput: form[data.name] ? form[data.name] : "",
        valueSelect: data.valueSelect ? data.valueSelect : [],
        key: data.name,
      },
      textarea: {
        label: data.label,
        name: data.name,
        typeTextField: data.typeTextField,
        disabled: data.disabled,
        type: data.type,
        placeholder: data.placeholder,
        onChange: handleChange,
        valueInput: form[data.name] ? form[data.name] : "",
        valueSelect: data.valueSelect ? data.valueSelect : [],
        key: data.name,
      },
      additional_actions: {
        valueSelect: data.valueSelect ? data.valueSelect : [],
        onChange: handleChange,
      },
    }
    return componentByChoice[data.type](value[data.type])
  }

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
              {dataForm?.length !== 0 &&
                form &&
                Object.keys(form).length !== 0 && (
                  <form>{dataForm?.map((data) => propsByType(data))}</form>
                )}
              {textButton && onClick && (
                <section className={"containerButtonModalCreate"}>
                  <Button
                    value={textButton}
                    onClick={() => onClick(form)}
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
