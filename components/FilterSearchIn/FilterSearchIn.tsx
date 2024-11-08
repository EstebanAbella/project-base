import React, { useEffect, useRef, useState } from "react"
import styles from "./FilterSearchIn.module.scss"
import useFocusTrap from "../../hooks/useFocusTrap"
import useDropdownDirection from "./useDropdownDirection"

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
  const containerRef = useRef<HTMLDivElement>(null)
  const { openUpwards, handleToggle } = useDropdownDirection(containerRef)

  useFocusTrap(
    containerRef,
    `a[href], button:not([disabled]), input, .${styles.list}`,
    !isOpen,
    selectedOption
  )

  const handleSelect = (option: string) => {
    setSelectedOption(option)
    setIsOpen(false)
    setFilter(option)
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      setIsOpen(!isOpen)
    }
  }

  const handleEscapeKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      const firstOption = containerRef.current?.querySelector(`.${styles.list}`)
      firstOption?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [containerRef])

  const handleClick = () => {
    setSelectedOption("")
  }

  return (
    <div className={styles.customSelect} ref={containerRef}>
      <div
        className={styles.selectInput}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          handleEnterKey(e)
        }}
        tabIndex={0}
      >
        <input
          type='text'
          placeholder='Filter'
          readOnly
          value={selectedOption || ""}
          tabIndex={-1}
        />
        <span
          className={`${styles.arrow} ${isOpen ? `${styles.topTriangle}` : `${styles.buttonTriangle}`}`}
        >
          {"▲"}
        </span>
      </div>

      {isOpen && (
        <ul
          className={`${styles.optionsList} ${openUpwards ? "top" : "bottom"}`}
        >
          {filterOptions.map((option) => (
            <li
              key={option.id}
              className={`${styles.option} ${selectedOption === option.name ? styles.selected : ""} ${styles.list}`}
              onClick={() => handleSelect(option.name)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSelect(option.name)
                }
                if (e.key === "Escape") {
                  handleEscapeKey(e)
                }
              }}
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
          <span
            className='icon-close close'
            onClick={handleClick}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleClick()
              }
            }}
          ></span>
        </div>
      )}
    </div>
  )
}

export default FilterSearchIn
