import React, { useEffect, useRef, useState } from "react"
import useFocusTrap from "../../hooks/useFocusTrap"
import useDropdownDirection from "./useDropdownDirection"

interface FilterSearchInPropsType {
  filterOptions: { id: string; name: string }[]
  setFilter: Function
}

export const FilterSearchIn = ({
  filterOptions,
  setFilter,
}: FilterSearchInPropsType) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { openUpwards, handleToggle } = useDropdownDirection(containerRef)

  useFocusTrap(
    containerRef,
    `a[href], button:not([disabled]), input, .list`,
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

  const handleEscapeKey = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Escape" && isOpen) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      const firstOption = containerRef.current?.querySelector(
        `.list`
      ) as HTMLElement | null
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
    setSelectedOption(null)
    setFilter("")
  }

  return (
    <div className='customSelect' ref={containerRef}>
      <div
        className='selectInput'
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
          value={
            filterOptions.find((opt) => opt.id === selectedOption)?.name || ""
          }
          tabIndex={-1}
        />
        <span className={`arrow ${isOpen ? `topTriangle` : `buttonTriangle`}`}>
          {"▲"}
        </span>
      </div>

      {isOpen && (
        <ul className={`optionsList ${openUpwards ? "top" : "bottom"}`}>
          {filterOptions?.map((option) => (
            <li
              key={option.id}
              className={`option ${selectedOption === option.id ? "selected" : ""} list`}
              onClick={() => handleSelect(option.id)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSelect(option.id)
                }
                if (e.key === "Escape") {
                  handleEscapeKey(e)
                }
              }}
            >
              {option.name}
              {selectedOption === option.id && <span className='check'>✓</span>}
            </li>
          ))}
        </ul>
      )}

      {selectedOption && (
        <div className='containerSelectedLabel'>
          <p className='selectedLabel'>
            {" "}
            {filterOptions.find((opt) => opt.id === selectedOption)?.name}
          </p>
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
