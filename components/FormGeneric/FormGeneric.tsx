import React, { ReactNode, FormHTMLAttributes } from "react"

type FormGenericProps = {
  children: ReactNode
} & FormHTMLAttributes<HTMLFormElement>

export const FormGeneric: React.FC<FormGenericProps> = ({
  children,
  ...rest
}) => {
  return <form {...rest}>{children}</form>
}
