export interface CheckboxComponentProps {
  name: string
  label: string
  value: { [moduleName: string]: string[] }
  onChange: (e: {
    target: {
      name: string
      value: { [moduleName: string]: string[] }
      type: string
    }
  }) => void
  checkboxItems: string[]
  moduleName: string
}
