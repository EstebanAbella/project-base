import CheckboxComponent from "../CheckboxComponent/CheckboxComponent"
import { SelectMultiple } from "../SelectMultiple/SelectMultiple"

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

export type typeTextField =
  | "text"
  | "number"
  | "email"
  | "password"
  | "select"
  | "select-multiple"
  | "textarea"
  | "checkbox"

export const TextField = ({
  valueInput = "",
  label = "",
  name = "",
  typeTextField = TextFieldType.PRIMARY,
  disabled = false,
  onChange = () => {},
  type = "text",
  placeholder = "",
  valueSelect = [],
  rows = 2,
  isShown = true,
  checkboxItems,
  moduleName,
}: {
  valueInput?: any
  label?: string
  name?: string
  type?: typeTextField
  typeTextField?: TextFieldType
  disabled?: boolean
  onChange?: (e: any) => void
  placeholder?: string
  valueSelect?: string[]
  rows?: number
  isShown?: boolean
  checkboxItems?: string[]
  moduleName?: string
}) => {
  console.log("valueInput", valueInput)
  return (
    <div className={`textField ${typeTextField}`}>
      {isShown && <label>{label}</label>}
      {(type === "text" ||
        type === "number" ||
        type === "email" ||
        type === "password") &&
        isShown && (
          <input
            name={name}
            disabled={disabled}
            value={valueInput}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
          />
        )}

      {type === "select" && (
        <select name={name} disabled={disabled} onChange={onChange}>
          <option value={"-"}>-</option>
          {valueSelect.map((data) => (
            <option value={data} key={data} selected={valueInput === data}>
              {data}
            </option>
          ))}
        </select>
      )}
      {type === "select-multiple" && (
        <SelectMultiple
          name={name}
          onChange={onChange}
          value={Array.isArray(valueInput) ? valueInput : []}
          options={valueSelect}
        />
      )}

      {type === "checkbox" && checkboxItems && moduleName && (
        <CheckboxComponent
          name={name}
          label={label}
          value={valueInput}
          onChange={onChange}
          moduleName={moduleName}
          checkboxItems={checkboxItems}
        />
      )}

      {type === "textarea" && (
        <textarea
          name={name}
          disabled={disabled}
          value={valueInput}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
        />
      )}
    </div>
  )
}
