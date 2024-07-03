import React, { useEffect, useState } from 'react'
import Button from './Button'
import { StaticImageData } from 'next/image'
import TextField, { TextFieldType } from './TextField'

export type ModalPropsType = {
  img?: string
  text?: []
  textButton?: string
  onClick?: (e: any) => void
  setStateModal: (e: any) => void
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
  const [form, setForm] = useState({})

  useEffect(() => {
    if (dataForm?.length !== 0) {
      const setPropertyForm = dataForm?.map((data) => data.name)
      console.log(setPropertyForm)
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
            dataForm?.map((data) => (
              <TextField
                label={data.label}
                name={data.name}
                typeTextField={data.typeTextField}
                disabled={data.disabled}
                type={data.type}
                placeholder={data.placeholder}
                onChange={handleChange}
                // value={form[data.name]}
              ></TextField>
            ))}
          {textButton && <Button value={textButton} onClick={onClick}></Button>}
        </div>
      </div>
    </section>
  )
}

export default Modal
