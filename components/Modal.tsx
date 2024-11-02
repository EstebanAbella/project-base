import React, { useEffect, useState } from "react"
import Button, { ButtonType } from "./Button"
import TextFieldModalCrud, { TextFieldType } from "./TextFieldModalCrud"
import TagInput from "./TagInput"

export type ModalPropsType = {
  img?: string
  text?: []
  textButton?: string
  typeButton?: ButtonType
  onClick?: (e: any) => void
  setStateModal: (e: any) => void | undefined
  stateModal: boolean
  dataForm?: Array<dataFormType>
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
    }
  }, [initialData])

  const handleChange = (fieldValue: { [key: string]: string | number }) => {
    setForm((prevForm: any) => ({ ...prevForm, ...fieldValue }))
    console.log("form", form)
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
                  <form>
                    {dataForm?.map((data) =>
                      data.type === "tagInput" ? (
                        <TagInput
                          name={data.name}
                          disabled={data.disabled}
                          value={form[data.name] ? form[data.name] : []}
                          onChange={handleChange}
                          placeholder={data.placeholder}
                        ></TagInput>
                      ) : (
                        <TextFieldModalCrud
                          label={data.label}
                          name={data.name}
                          typeTextField={data.typeTextField}
                          disabled={data.disabled}
                          type={data.type}
                          placeholder={data.placeholder}
                          onChange={handleChange}
                          valueInput={form[data.name] ? form[data.name] : ""}
                          valueSelect={data.valueSelect ? data.valueSelect : []}
                          key={data.name}
                        ></TextFieldModalCrud>
                      )
                    )}
                  </form>
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
