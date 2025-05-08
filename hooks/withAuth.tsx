import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { roleMap, RoleType } from "./roleMap"
import { useAuthContext } from "../context/auth/AuthContext"

const withAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth = (props: any) => {
    const { user } = useAuthContext()
    const userRole = user?.role
    const [isAuthorized, setIsAuthorized] = useState(false)
    const router = useRouter()

    const componentName = WrappedComponent.displayName || WrappedComponent.name
    const extractedComponentName =
      componentName.match(/\(([^)]+)\)/)?.[1] || componentName

    useEffect(() => {
      const requiredRoles = roleMap[extractedComponentName]

      if (
        userRole &&
        requiredRoles &&
        !requiredRoles.includes(userRole as RoleType)
      ) {
        setIsAuthorized(false)
        router.push("/notAuthorized")
        return
      }

      setIsAuthorized(!!userRole)
    }, [userRole, extractedComponentName])

    return isAuthorized ? <WrappedComponent {...props} /> : <div></div>
  }

  ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name})`

  return ComponentWithAuth
}

export default withAuth
