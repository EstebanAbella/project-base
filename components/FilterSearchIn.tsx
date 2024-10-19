import React, { useState } from "react"
import styles from "../styles/components/FilterSearchIn.module.scss"

interface FilterSearchInPropsType {
  filterOptions: { id: number; name: string }[]
  setFilter: Function
}

const FilterSearchIn = ({
  filterOptions,
  setFilter,
}: FilterSearchInPropsType) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSelect = (option: string) => {
    setSelectedOption(option)
    setIsOpen(false)
    setFilter(option)
  }

  const handleClick = () => {
    setSelectedOption("")
  }

  return (
    <div className={styles.customSelect}>
      <div className={styles.selectInput} onClick={() => setIsOpen(!isOpen)}>
        <input
          type='text'
          placeholder='Filter'
          readOnly
          value={selectedOption || ""}
        />
        <span
          className={`${styles.arrow} ${isOpen ? `${styles.topTriangle}` : `${styles.buttonTriangle}`}`}
        >
          {"▲"}
        </span>
      </div>

      {isOpen && (
        <ul className={styles.optionsList}>
          {filterOptions.map((option) => (
            <li
              key={option.id}
              className={`${styles.option} ${selectedOption === option.name ? styles.selected : ""}`}
              onClick={() => handleSelect(option.name)}
            >
              {option.name}
              {selectedOption === option.name && (
                <span className={styles.check}>✓</span>
              )}
            </li>
          ))}
        </ul>
      )}

      {selectedOption && (
        <div className={styles.containerSelectedLabel}>
          <p className={styles.selectedLabel}>{selectedOption}</p>
          <span className='icon-close close' onClick={handleClick}></span>
        </div>
      )}
    </div>
  )
}

export default FilterSearchIn
