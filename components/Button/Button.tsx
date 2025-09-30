import { ReactNode } from "react"

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
  ERROR = "error",
  SUCCESS = "success",
  INFORMATION = "information",
  LOGIN = "login",
}

export const Button = ({
  value = "",
  type = ButtonType.PRIMARY,
  disabled = false,
  onClick = () => {},
  isSubmit = false,
  icon = "",
  extraClassName = "",
  ariaLabel,
}: {
  value?: string | ReactNode
  type?: ButtonType
  disabled?: boolean
  onClick?: (e: any) => void
  isSubmit?: boolean
  icon?: string
  extraClassName?: string
  ariaLabel?: string
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={isSubmit ? "submit" : "button"}
      className={`Button ${type} ${extraClassName} ${disabled ? "disabled" : ""}`}
      aria-label={ariaLabel}
    >
      {value}
      <span className={icon}></span>
    </button>
  )
}
