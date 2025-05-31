export interface CheckboxComponentProps {
  name: string
  label: string
  moduleName: Record<string, string[]>
  value: Record<string, string[]>
  onChange: (value: Record<string, string[]>) => void
}
