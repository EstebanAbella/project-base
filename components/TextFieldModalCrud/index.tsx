import TagInput from "../TagInput"
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
  valueInput = "",
  label = "",
  name = "",
  typeTextField = TextFieldType.PRIMARY,
  disabled = false,
  onChange = () => {},
  type = "",
  placeholder = "",
  valueSelect = [],
  rows = 2,
}: {
  valueInput?: string
  label?: string
  name?: string
  type?: string
  typeTextField?: TextFieldType
  disabled?: boolean
  onChange?: (name: string, value: string | string[]) => void
  placeholder?: string
  valueSelect?: string[]
  rows?: number
}) => {
  return (
    <div className={`${styles.textField} ${styles.typeTextField}`}>
      <label>{label}</label>
      {(type === "text" || type === "number") && (
        <input
          name={name}
          disabled={disabled}
          value={valueInput}
          onChange={(e) => onChange(name, e.target.value)}
          type={type}
          placeholder={placeholder}
        />
      )}

      {type === "select" && (
        <select
          name={name}
          disabled={disabled}
          onChange={(e) => onChange(name, e.target.value)}
        >
          <option value={"-"}>-</option>
          {valueSelect.map((data) => (
            <option value={data} key={data} selected={valueInput === data}>
              {data}
            </option>
          ))}
        </select>
      )}

      {type === "textarea" && (
        <textarea
          name={name}
          disabled={disabled}
          value={valueInput}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
      )}

      {type === "tagInput" && (
        <TagInput
          name={name}
          disabled={disabled}
          value={valueInput}
          onChange={onChange}
          placeholder={placeholder}
        ></TagInput>
      )}
    </div>
  )
}

export default TextFieldModalCrud
