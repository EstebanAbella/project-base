import CheckboxComponentModule from "../CheckboxComponentModule/CheckboxComponentModule"
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
  | "checkboxModule"

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
  moduleName,
  setForm,
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
  moduleName?: Record<string, string[]>
  setForm: Function
}) => {
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
            autoComplete={type === "password" ? "current-password" : "off"}
          />
        )}

      {type === "select" && (
        <select
          name={name}
          disabled={disabled}
          onChange={onChange}
          value={valueInput || "-"}
        >
          <option value={"-"}>-</option>
          {valueSelect.map((data) => (
            <option value={data} key={data}>
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

      {type === "checkboxModule" && moduleName && (
        <CheckboxComponentModule
          name={name}
          label={label}
          value={valueInput || {}}
          moduleName={moduleName}
          onChange={(newPermissions) => {
            setForm((prev: any) => ({
              ...prev,
              [name]: newPermissions,
            }))
          }}
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
