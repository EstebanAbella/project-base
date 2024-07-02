import React, { useEffect } from 'react'
import { RootState } from '../redux/rootReducer'
import { connect } from 'react-redux'
import { isNavigationOnlineReducerPropsTypes } from '../redux/isNavigationOnline/reducer'
import { useIsNavigationOnline } from '../hooks/useIsNavigationOnline'
import { isNavigationOnline } from '../redux/isNavigationOnline/actions'

const mapStateToProps = (state: RootState) => {
  const isNavigationReducer = state.isNavigationOnOff
  return {
    isNavigationOnline: isNavigationReducer.isNavigationOnline,
    isNavigationOnlineStatus: isNavigationReducer.isNavigationOnlineStatus,
  }
}

const mapDispatchToProps = {
  isNavigationOnline,
}
export type AlertNoConnectionPropsType = {
  isNavigationOnline: Function
} & isNavigationOnlineReducerPropsTypes

const AlertNoConnection = ({
  isNavigationOnline,
}: AlertNoConnectionPropsType) => {
  const isOnline = useIsNavigationOnline()
  useEffect(() => {
    isNavigationOnline(isOnline)
  }, [isOnline])
  return (
    <section
      className={`alertConnection ${
        isOnline ? ' connection ' : 'noConnection'
      }`}
    >
      Sin conexión
    </section>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AlertNoConnection)
