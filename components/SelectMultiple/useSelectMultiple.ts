import { useState, useRef, useEffect } from "react"
import { SelectMultiplePropsType } from "./SelectMultiple.interface"

export const useSelectMultiple = ({
  value,
  onChange,
  name,
}: Pick<SelectMultiplePropsType, "value" | "onChange" | "name">) => {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const toggleItem = (item: string) => {
    const alreadySelected = value.includes(item)
    const updated = alreadySelected
      ? value.filter((v) => v !== item)
      : [...value, item]

    onChange({
      target: {
        name,
        value: updated,
        type: "select-multiple",
      },
    })
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])
  return { ref, setIsOpen, isOpen, toggleItem }
}
