import React, { useEffect, useState } from "react"

export type AdditionalAction = {
  [key: string]: string | number
}

export type AdditionalActionsInputProps = {
  valueSelect: string[]
  onChange: (e: any) => void
  label?: string
  name: string
  type?: string
  disabled?: boolean
  valueInput?: AdditionalAction[]
  title?: string
}

export const AdditionalActionsInput = ({
  valueSelect,
  onChange,
  name,
  label,
  type,
  disabled,
  valueInput = [],
  title,
}: AdditionalActionsInputProps) => {
  const [additionalActions, setAdditionalActions] = useState<
    AdditionalAction[]
  >([])
  const [actionSets, setActionSets] = useState<
    { selectedOption: string | null; inputValue: string | number }[]
  >([])

  useEffect(() => {
    if (!valueInput) return
    setAdditionalActions(valueInput)

    // setActionSets(
    //   valueInput?.map((action) => {
    //     const key = Object.keys(action)[0]
    //     return { selectedOption: key, inputValue: action[key] }
    //   })
    // )
    setActionSets(
      valueInput.map(() => ({ selectedOption: null, inputValue: "" }))
    )
  }, [valueInput])

  const handleAddActionSet = (e: React.MouseEvent) => {
    e.preventDefault()
    setActionSets([...actionSets, { selectedOption: null, inputValue: "" }])
  }

  const handleSelectChange = (index: number, value: string) => {
    const updatedActionSets = [...actionSets]
    updatedActionSets[index].selectedOption = value
    setActionSets(updatedActionSets)
  }

  const handleInputChange = (index: number, value: string) => {
    const updatedActionSets = [...actionSets]
    updatedActionSets[index].inputValue = value
    setActionSets(updatedActionSets)
  }

  const handleSaveAction = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    const { selectedOption, inputValue } = actionSets[index]
    if (selectedOption && inputValue !== "") {
      const updatedActions = [...additionalActions]
      if (!updatedActions[index]) {
        updatedActions[index] = {}
      }
      updatedActions[index][selectedOption] = isNaN(Number(inputValue))
        ? inputValue
        : Number(inputValue)
      setAdditionalActions(updatedActions)
      setActionSets((prevSets) => {
        const updatedSets = [...prevSets]
        updatedSets[index].selectedOption = null
        updatedSets[index].inputValue = ""
        return updatedSets
      })
      onChange({ [name]: updatedActions })
    }
  }

  const handleDeleteAction = (index: number, key: string) => {
    const updatedActions = [...additionalActions]
    if (updatedActions[index]) {
      delete updatedActions[index][key]
      setAdditionalActions(updatedActions)
      onChange({ [name]: updatedActions })
    }
  }

  const getDisabledOptions = (index: number) => {
    const usedOptions = Object.keys(additionalActions[index] || {})
    return usedOptions
  }

  return (
    <div className='containerAdditionalActions'>
      <label title={title || ""}>{label}</label>
      <button onClick={handleAddActionSet} className='buttonAdditionalActions'>
        + Add action
      </button>

      {actionSets.map((actionSet, index) => (
        <div className='containerActions' key={index}>
          <div className='containerSelectors'>
            <select
              value={actionSet.selectedOption || ""}
              onChange={(e) => handleSelectChange(index, e.target.value)}
            >
              <option value=''>Ingrese tipo</option>
              {valueSelect.map((option) => (
                <option
                  key={option}
                  value={option}
                  disabled={getDisabledOptions(index).includes(option)}
                  className={
                    getDisabledOptions(index).includes(option)
                      ? "disabledOption"
                      : ""
                  }
                >
                  {option}
                </option>
              ))}
            </select>

            <input
              type='text'
              value={actionSet.inputValue}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder='Ingrese un valor'
              disabled={!actionSet.selectedOption}
            />

            <button
              className='buttonAdditionalActions'
              onClick={(e) => handleSaveAction(e, index)}
              disabled={
                !actionSet.selectedOption || actionSet.inputValue === ""
              }
            >
              Save
            </button>
          </div>

          <div className='resultActionsContainer'>
            <h5>Acciones adicionales {index + 1}</h5>
            <ul>
              {additionalActions[index] &&
                Object.entries(additionalActions[index]).map(([key, value]) => (
                  <li key={key} className='tagItem'>
                    {key}: {value}
                    <span
                      className='icon-close close'
                      onClick={() => handleDeleteAction(index, key)}
                      tabIndex={0}
                    ></span>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
