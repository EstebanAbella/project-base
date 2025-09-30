"use client"
import { useState, useCallback } from "react"
const useDropdownDirection = (
  containerRef: React.RefObject<HTMLElement | null>
) => {
  const [openUpwards, setOpenUpwards] = useState<boolean>(false)
  const handleToggle = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const availableSpaceBelow = window.innerHeight - rect.bottom
      const availableSpaceAbove = rect.top
      if (
        availableSpaceBelow < 200 &&
        availableSpaceAbove > availableSpaceBelow
      ) {
        setOpenUpwards(true)
      } else {
        setOpenUpwards(false)
      }
    }
  }, [containerRef])
  return {
    openUpwards,
    handleToggle,
  }
}
export default useDropdownDirection
