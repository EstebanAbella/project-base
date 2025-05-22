import React, { useEffect, useState } from "react"
import { Button, ButtonType } from "../Button/Button"
import { TextField, TextFieldType, typeTextField } from "../TextField/TextField"

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
  isShown?: boolean
}

export const ModalCrud = ({
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

  useEffect(() => {
    if (dataForm?.length && !initialData) {
      const setPropertyForm = dataForm?.reduce(
        (obj: { [key: string]: string }, item: dataFormType) => {
          obj[item.name] = item.defaultValue ? item.defaultValue : ""
          return obj
        },
        {}
      )
      setForm(setPropertyForm)
    }
  }, [dataForm])

  const handleChange = (e: React.SyntheticEvent<EventTarget>) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement
    const { name, type } = target

    let value: string | string[] = target.value

    if (type === "select-multiple" && target instanceof HTMLSelectElement) {
      value = Array.from(target.selectedOptions, (option) => option.value)
    }

    setForm({ ...form, [name]: value })
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
              {dataForm?.length && form && Object.keys(form).length && (
                <form>
                  {dataForm?.map((data) => (
                    <TextField
                      label={data.label}
                      name={data.name}
                      typeTextField={data.typeTextField}
                      disabled={data.disabled}
                      type={data.type as typeTextField}
                      placeholder={data.placeholder}
                      onChange={handleChange}
                      valueInput={form[data.name] ? form[data.name] : ""}
                      valueSelect={data.valueSelect ? data.valueSelect : []}
                      key={data.name}
                      isShown={data.isShown}
                    ></TextField>
                  ))}
                </form>
              )}
              {textButton && onClick && (
                <Button
                  value={textButton}
                  onClick={() => onClick(form)}
                  type={typeButton}
                ></Button>
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
