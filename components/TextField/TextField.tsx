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

export const TextField = ({
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
  onChange?: (e: any) => void
  placeholder?: string
  valueSelect?: string[]
  rows?: number
}) => {
  return (
    <div className={`textField ${typeTextField}`}>
      <label>{label}</label>
      {(type === "text" ||
        type === "number" ||
        type === "email" ||
        type === "password") && (
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
