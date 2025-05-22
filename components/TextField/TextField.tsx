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
}: {
  valueInput?: string | string[]
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
          name='permissions'
          options={["view", "create", "update", "delete", "import", "export"]}
          value={Array.isArray(valueInput) ? valueInput : []}
          onChange={onChange}
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
