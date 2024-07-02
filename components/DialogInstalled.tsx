import React, { useEffect, useState } from 'react'
import Button from './Button'
import { VipoLogo } from './VipoLogo'


const DialogInstalled = () => {
  const [show, setShow] = useState(true)

  return (
    <>
      {show && <section
        className="root"
        // onClick={() => installedDialog.prompt()}
        style={{ display: 'flex' }}
      >
        <VipoLogo classVipoLogo="logo" />
        <div className="promptInstall">
          <p>Agrega vipo a tu celular</p>
        </div>

        <span
          aria-label="Cerrar"
          onClick={(e: any) => {
            e.stopPropagation()
            setShow(false)
          }}
          className="icon-close"
          style={{
            cursor: 'pointer',
          }}
        />
      </section>}
    </>
  )
}

export default DialogInstalled
