import React, { useEffect, useState } from 'react'
import Button from './Button'
import { StaticImageData } from 'next/image'
import TextField, { TextFieldType } from './TextField'

export type ModalPropsType = {
  img?: string
  text?: []
  textButton?: string
  onClick?: (e: any) => void
  setStateModal: (e: any) => void | undefined
  stateModal: boolean
  dataForm?: Array<dataFormType>
}

export type dataFormType = {
  label: string
  name: string
  typeTextField: TextFieldType
  disabled: boolean
  type: string
  placeholder: string
}

const Modal = ({
  img,
  text,
  textButton,
  stateModal,
  setStateModal,
  onClick,
  dataForm,
}: ModalPropsType) => {
  const [form, setForm] = useState<any>()

  useEffect(() => {
    if (dataForm?.length !== 0) {
      const setPropertyForm = dataForm?.reduce(
        (obj: { [key: string]: string }, item: dataFormType) => {
          obj[item.name] = ''
          return obj
        },
        {}
      )
      setForm(setPropertyForm)
    }
  }, [dataForm])

  const handleChange = (e: React.SyntheticEvent<EventTarget>) => {
    const name = (e.target as HTMLInputElement).name
    const value = (e.target as HTMLInputElement).value
    setForm({ ...form, [name]: value })
  }

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
              {text.map((data) => (
                <p>{data}</p>
              ))}
            </div>
          )}
          {dataForm?.length !== 0 &&
            form &&
            Object.keys(form).length !== 0 &&
            dataForm?.map((data) => (
              <TextField
                label={data.label}
                name={data.name}
                typeTextField={data.typeTextField}
                disabled={data.disabled}
                type={data.type}
                placeholder={data.placeholder}
                onChange={handleChange}
                value={form[data.name] ? form[data.name] : ''}
              ></TextField>
            ))}
          {textButton && onClick && (
            <Button value={textButton} onClick={() => onClick(form)}></Button>
          )}
        </div>
      </div>
    </section>
  )
}

export default Modal
