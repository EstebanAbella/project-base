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
        <button onClick={onClose} className={styles.closeButton}>
          Cerrar
        </button>
        <h2>Configuración de Columnas</h2>
        {children}
      </div>
    </div>
  )
}

export default ModalTable
