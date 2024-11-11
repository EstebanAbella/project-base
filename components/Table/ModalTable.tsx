import React from "react"
import styles from "./ModalTable.module.scss"

interface ModalTableProps {
  onClose: () => void
  children: React.ReactNode
}

const ModalTable: React.FC<ModalTableProps> = ({ onClose, children }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <span className={`icon-close ${styles.close}`} onClick={onClose}></span>
        <h4>Column configuration</h4>
        {children}
      </div>
    </div>
  )
}

export default ModalTable
