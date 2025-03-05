import React from "react"
import { RootState } from "../../redux/rootReducer"
import { useSelector } from "react-redux"

export const NavigationComponent = () => {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <nav className='navigation'>
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
