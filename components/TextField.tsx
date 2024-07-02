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
  type = TextFieldType.PRIMARY,
  disabled = false,
  onChange = () => {},
}: {
  value?: string
  label?: string
  name?: string
  type?: TextFieldType
  disabled?: boolean
  onChange?: (e: any) => void
}) => {
  return (
    <div className={`textField ${type}`}>
      <label>{label}</label>
      <input
        name={name}
        disabled={disabled}
        defaultValue={value}
        onChange={onChange}
      />
    </div>
  )
}

export default TextField
