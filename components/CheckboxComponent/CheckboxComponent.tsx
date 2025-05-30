import React, { useEffect, useState } from "react"
import { CheckboxComponentProps } from "./CheckboxComponent.interface"

const CheckboxComponent = ({
  name,
  label,
  value,
  onChange,
  checkboxItems,
  moduleName,
}: CheckboxComponentProps) => {
  const [enabled, setEnabled] = useState(false)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  useEffect(() => {
    const newPermissions = value[moduleName] || []

    const samePermissions =
      selectedPermissions.length === newPermissions.length &&
      selectedPermissions.every((p) => newPermissions.includes(p))

    if (!samePermissions || enabled !== newPermissions.length > 0) {
      setEnabled(newPermissions.length > 0)
      setSelectedPermissions(newPermissions)
    }
  }, [value, moduleName])

  useEffect(() => {
    const finalValue = enabled ? selectedPermissions : []
    const current = value[moduleName] || []
    const same =
      current.length === finalValue.length &&
      current.every((v) => finalValue.includes(v))

    if (!same) {
      const updatedValue = {
        ...value,
        [moduleName]: finalValue,
      }

      onChange({
        target: {
          name,
          value: updatedValue,
          type: "checkbox-group",
        },
      })
    }
  }, [enabled, selectedPermissions])

  const handlePermissionToggle = (perm: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    )
  }

  return (
    <div className='checkboxModuleComponent'>
      <label className='containerModuleName'>
        <strong style={{ marginLeft: "8px" }}>{moduleName}</strong>
        <input
          type='checkbox'
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
          className='inputCheck'
        />
      </label>

      <div className='containerChecks'>
        {checkboxItems.map((perm) => (
          <label key={perm} className='labelChecks'>
            <span style={{ marginLeft: "6px" }}>{perm}</span>
            <input
              className='inputCheck'
              type='checkbox'
              disabled={!enabled}
              checked={selectedPermissions.includes(perm)}
              onChange={() => handlePermissionToggle(perm)}
            />
          </label>
        ))}
      </div>
    </div>
  )
}

export default CheckboxComponent
