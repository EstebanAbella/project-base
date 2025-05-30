import React, { useEffect, useState } from "react"

interface CheckboxComponentProps {
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

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  name,
  label,
  value,
  onChange,
  checkboxItems,
  moduleName,
}) => {
  const [enabled, setEnabled] = useState(false)
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  // 🔁 Solo actualizamos si de verdad hay diferencias
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

  // Comunicar cambios al padre (solo si cambia algo en enabled o selectedPermissions)
  useEffect(() => {
    const finalValue = enabled ? selectedPermissions : []
    // ⚠️ Si value[moduleName] ya tiene ese mismo valor, no hacemos onChange
    const current = value[moduleName] || []
    const same =
      current.length === finalValue.length &&
      current.every((v) => finalValue.includes(v))

    if (!same) {
      onChange({
        target: {
          name,
          value: {
            [moduleName]: finalValue,
          },
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
    <div style={{ marginBottom: "1rem" }}>
      <label>
        <input
          type='checkbox'
          checked={enabled}
          onChange={() => setEnabled(!enabled)}
        />
        <strong style={{ marginLeft: "8px" }}>{moduleName}</strong>
      </label>

      <div style={{ marginLeft: "24px", marginTop: "4px" }}>
        {checkboxItems.map((perm) => (
          <label key={perm} style={{ display: "block" }}>
            <input
              type='checkbox'
              disabled={!enabled}
              checked={selectedPermissions.includes(perm)}
              onChange={() => handlePermissionToggle(perm)}
            />
            <span style={{ marginLeft: "6px" }}>{perm}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

export default CheckboxComponent
