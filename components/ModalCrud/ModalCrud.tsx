"use client"
import React, { useEffect, useState } from "react"
import { Button, ButtonType } from "../Button/Button"
import { TextField, TextFieldType, typeTextField } from "../TextField/TextField"
import { FormGeneric } from "../FormGeneric"
import Image from "next/image"
import { ServerStatus } from "../../interface/global"

export type ModalPropsType = {
  img?: string
  text?: []
  textButton?: string
  typeButton?: ButtonType
  onClick?: (e: any) => void
  setStateModal: (e: any) => void | undefined
  stateModal: {
    type: string
    state: boolean
  }
  dataForm?: Array<dataFormType>
  initialData?: any
  status: ServerStatus | undefined
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
  moduleName?: Record<string, string[]>
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
  initialData,
  status,
}: ModalPropsType) => {
  const [form, setForm] = useState(() => {
    if (initialData) return initialData
    if (dataForm?.length) {
      return dataForm.reduce(
        (obj: { [key: string]: string }, item: dataFormType) => {
          obj[item.name] = item.defaultValue ?? ""
          return obj
        },
        {}
      )
    }
    return {}
  })

  useEffect(() => {
    if (initialData) {
      setForm(initialData)
    } else if (dataForm?.length) {
      const setPropertyForm = dataForm?.reduce(
        (obj: { [key: string]: string }, item: dataFormType) => {
          obj[item.name] = item.defaultValue ?? ""
          return obj
        },
        {}
      )
      setForm(setPropertyForm)
    }
  }, [stateModal.type, initialData])

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
    <section className={`modal ${stateModal.state ? "open" : "close"}`}>
      <div className='modalContainerCrud'>
        <span className='icon-close close' onClick={setStateModal}></span>
        <div className='modalContentCrud'>
          {img && (
            <Image src={img} alt='Image Modal' width={100} height={100} />
          )}
          {text && (
            <div className='textModal'>
              {text.map((data, index) => (
                <p key={index}>{data}</p>
              ))}
            </div>
          )}
          {dataForm?.length && form && Object.keys(form || {}).length && (
            <FormGeneric>
              {dataForm?.map((data, index) => (
                <TextField
                  label={data.label}
                  name={data.name}
                  typeTextField={data.typeTextField}
                  disabled={data.disabled}
                  type={data.type as typeTextField}
                  placeholder={data.placeholder}
                  onChange={handleChange}
                  valueInput={form[data.name]}
                  valueSelect={data.valueSelect ? data.valueSelect : []}
                  key={`${data.name}${index}`}
                  isShown={data.isShown}
                  moduleName={data.moduleName}
                  setForm={setForm}
                ></TextField>
              ))}
            </FormGeneric>
          )}
          {textButton && onClick && (
            <Button
              value={status !== ServerStatus.FETCHING ? textButton : "Loading"}
              onClick={() => onClick(form)}
              type={typeButton}
              disabled={status === ServerStatus.FETCHING}
            ></Button>
          )}
        </div>
      </div>
    </section>
  )
}
