import React from "react"

interface ModalTableProps {
  onClose: () => void
  children: React.ReactNode
}

export const ModalTable: React.FC<ModalTableProps> = ({
  onClose,
  children,
}) => {
  return (
    <div className='modalOverlay'>
      <div className='modalContent'>
        <span className={`icon-close close`} onClick={onClose}></span>
        <h4>Customize table</h4>
        {children}
      </div>
    </div>
  )
}
