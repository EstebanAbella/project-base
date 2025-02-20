import { useEffect, useState } from "react"

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

export const TextFieldModalCrud = ({
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
  title,
  itIsVisible = true,
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
  title?: string
  itIsVisible?: boolean
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
    <div
      className={`textField ${typeTextField} ${!itIsVisible ? "itIsVisible" : ""}`}
    >
      <label title={title || ""}>
        {label} {isRequired && <span className='isRequiredIcon'>*</span>}
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
          <option value={""}>-</option>
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
