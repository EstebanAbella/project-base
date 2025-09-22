import React from "react"
import { useAuthContext } from "../../context/auth/AuthContext"

export const NavigationComponent = () => {
  const { user } = useAuthContext()

  return (
    <nav className='navigationComponent'>
      <div className='containerInfoUser'>
        <div className='infoUser'>
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </div>

        <div className='letterName'>
          <p>{user?.name[0]}</p>
        </div>
      </div>
    </nav>
  )
}
