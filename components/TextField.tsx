export enum TextFieldType {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  DANGER = 'danger',
  WARNING = 'warning',
  SUCCESS = 'success',
  INFO = 'info',
  LIGHT = 'light',
  DARK = 'dark',
  LINK = 'link',
}

const TextField = ({
  value = '',
  label = '',
  name = '',
  typeTextField = TextFieldType.PRIMARY,
  disabled = false,
  onChange = () => {},
  type = '',
  placeholder = '',
  valueSelect = [],
}: {
  value?: string
  label?: string
  name?: string
  type?: string
  typeTextField?: TextFieldType
  disabled?: boolean
  onChange?: (e: any) => void
  placeholder?: string
  valueSelect?: string[]
}) => {
  return (
    <div className={`textField ${typeTextField}`}>
      <label>{label}</label>
      {type !== 'select' && (
        <input
          name={name}
          disabled={disabled}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
        />
      )}

      {type === 'select' && (
        <select name={name} disabled={disabled} onChange={onChange}>
          <option value={'-'} selected>
            -
          </option>
          {valueSelect.map((data) => (
            <option value={data} key={data}>
              {data}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}

export default TextField
