import { useEffect, useState } from "react"
import styles from "./TextFieldModalCrud.module.scss"

export enum TextFieldType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
  DANGER = "danger",
  WARNING = "warning",
  SUCCESS = "success",
  INFO = "info",
  LIGHT = "light",
  DARK = "dark",
  LINK = "link",
}

const TextFieldModalCrud = ({
  isRequired,
  label = "",
  name = "",
  typeTextField = TextFieldType.PRIMARY,
  disabled = false,
  onChange = () => {},
  type = "",
  placeholder = "",
  valueSelect = [],
  rows = 2,
  valueInput,
}: {
  valueInput?: string | number
  label?: string
  name?: string
  type?: string
  typeTextField?: TextFieldType
  disabled?: boolean
  onChange?: (e: any) => void
  placeholder?: string
  valueSelect?: string[]
  rows?: number
  isRequired?: boolean
}) => {
  const [inputValue, setInputValue] = useState<any>(valueInput || "")

  useEffect(() => {
    setInputValue(valueInput || "")
  }, [valueInput])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target
    setInputValue(value)

    onChange({ [name]: value })
  }

  return (
    <div className={`${styles.textField} ${styles.typeTextField}`}>
      <label>
        {label}{" "}
        {isRequired && <span className={`${styles.isRequiredIcon}`}>*</span>}
      </label>
      {(type === "text" || type === "number") && (
        <input
          name={name}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          type={type}
          placeholder={placeholder}
        />
      )}

      {type === "select" && (
        <select name={name} disabled={disabled} onChange={handleChange}>
          <option value={"-"}>-</option>
          {valueSelect.map((data) => (
            <option value={data} key={data} selected={inputValue === data}>
              {data}
            </option>
          ))}
        </select>
      )}

      {type === "textarea" && (
        <textarea
          name={name}
          disabled={disabled}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
        />
      )}
    </div>
  )
}

export default TextFieldModalCrud
