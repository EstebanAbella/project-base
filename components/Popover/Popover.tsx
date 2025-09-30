"use client"
import React, { useEffect, useState } from "react"
import NotificationService from "../../services/NotificationService"
import { Button } from "../Button"
import { ButtonType } from "../Button/Button"

export const Popover = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const handleError = (msg: string) => {
      setMessage(msg)
      setIsVisible(true)
    }

    NotificationService.on("error", handleError)

    return () => {
      NotificationService.off("error", handleError)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className='containerPopover'>
      <div className='popover'>
        <span className='popoverText'>{message ?? "Error"}</span>
      </div>

      <Button
        value={""}
        type={ButtonType.TERTIARY}
        icon={"icon-close"}
        onClick={() => setIsVisible(false)}
        aria-label='Cerrar'
        extraClassName='closeButton'
      ></Button>
    </div>
  )
}

export default Popover
