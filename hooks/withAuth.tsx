import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { connect } from "react-redux"
import { RootState } from "../redux/rootReducer"
import { ServerStatus } from "../interface/global"
import { roleMap, RoleType } from "./roleMap"

const mapStateToProps = (state: RootState) => ({
  userRole: state.auth.user?.role,
})

const mapDispatchToProps = {}

export type WithAuthPropsType = {
  userRole?: string
}

const withAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth = ({ userRole, ...props }: WithAuthPropsType) => {
    const [stateUSerRole, setStateUserRole] = useState<boolean>(false)
    const router = useRouter()
    const componentName = WrappedComponent.displayName || WrappedComponent.name
    const extractedComponentName =
      componentName.match(/\(([^)]+)\)/)?.[1] || componentName

    useEffect(() => {
      const requiredRole = roleMap[extractedComponentName]
      if (
        userRole !== undefined &&
        !requiredRole?.includes(userRole as RoleType)
      ) {
        setStateUserRole(false)
        router.push("/notAuthorized")
        return
      }
      if (userRole === undefined) {
        setStateUserRole(false)
      } else {
        setStateUserRole(true)
      }
    }, [userRole])

    return stateUSerRole ? <WrappedComponent {...props} /> : <div></div>
  }

  return connect(mapStateToProps, mapDispatchToProps)(ComponentWithAuth)
}

export default withAuth
