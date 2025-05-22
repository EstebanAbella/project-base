export interface SelectMultiplePropsType {
  name: string
  options: string[]
  value: string[]
  onChange: (e: {
    target: { name: string; value: string[]; type: "select-multiple" }
  }) => void
  disabled?: boolean
  placeholder?: string
}
