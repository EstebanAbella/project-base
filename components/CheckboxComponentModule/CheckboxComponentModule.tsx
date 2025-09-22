import React, { useEffect, useState } from "react"
import { CheckboxComponentProps } from "./CheckboxComponentModule.interface"

const CheckboxComponentModule = ({
  name,
  label,
  moduleName,
  value,
  onChange,
}: CheckboxComponentProps) => {
  const [selectedModules, setSelectedModules] = useState<
    Record<string, string[]>
  >({})

  useEffect(() => {
    const initialState: Record<string, string[]> = {}
    Object.keys(moduleName).forEach((mod) => {
      initialState[mod] = value[mod] || []
    })
    setSelectedModules(initialState)
  }, [moduleName, value])

  const handleModuleToggle = (mod: string) => {
    const alreadySelected = selectedModules[mod]?.length > 0
    const updated = {
      ...selectedModules,
      [mod]: alreadySelected ? [] : [...(moduleName[mod] || [])],
    }

    setSelectedModules(updated)
    onChange(updated)
  }

  const handlePermissionToggle = (mod: string, permission: string) => {
    const current = selectedModules[mod] || []
    const updatedPermissions = current.includes(permission)
      ? current.filter((p) => p !== permission)
      : [...current, permission]

    const updated = {
      ...selectedModules,
      [mod]: updatedPermissions,
    }

    setSelectedModules(updated)
    onChange(updated)
  }

  return (
    <div className='checkboxComponent'>
      <div className='moduleList'>
        {Object.keys(moduleName).map((mod) => {
          const isActive = (selectedModules[mod] || []).length > 0
          const allPermissions = moduleName[mod] || []

          return (
            <div key={mod} className='moduleBlock'>
              <label className='moduleLabel'>
                <input
                  type='checkbox'
                  checked={isActive}
                  onChange={() => handleModuleToggle(mod)}
                  className='moduleLabelCheckbox'
                />
                {mod}
              </label>

              {isActive && (
                <div className='permissions'>
                  {allPermissions.map((perm) => (
                    <label key={perm} className='permissionItem'>
                      <input
                        type='checkbox'
                        checked={(selectedModules[mod] || []).includes(perm)}
                        onChange={() => handlePermissionToggle(mod, perm)}
                      />
                      {perm}
                    </label>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CheckboxComponentModule
