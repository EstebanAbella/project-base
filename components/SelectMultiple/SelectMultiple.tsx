import { SelectMultiplePropsType } from "./SelectMultiple.interface"
import { useSelectMultiple } from "./useSelectMultiple"

export const SelectMultiple = ({
  name,
  options,
  value,
  onChange,
  disabled = false,
  placeholder = "Selecciona opciones",
}: SelectMultiplePropsType) => {
  const { ref, setIsOpen, isOpen, toggleItem } = useSelectMultiple({
    value,
    onChange,
    name,
  })

  return (
    <div
      className={`custom-select-wrapper ${disabled ? "disabled" : ""}`}
      ref={ref}
    >
      <div
        className='selected-display'
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span>{value.length > 0 ? value.join(", ") : placeholder}</span>
        <span className={`${"positionIconCheck"} ${isOpen ? "rotated" : ""}`}>
          ▼
        </span>
      </div>

      {isOpen && (
        <div className='options-list'>
          {options.map((item) => {
            const selected = value.includes(item)
            return (
              <div
                key={item}
                className={`option ${selected ? "selected" : ""}`}
                onClick={() => toggleItem(item)}
              >
                <span>{item}</span>
                {selected && <span className='icon-check'></span>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
