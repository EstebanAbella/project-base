import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useAuthContext } from "../context/auth/AuthContext"
import { TPermissionsObject, TSectionName } from "../interface/global"

const withAuth = (WrappedComponent: React.FC) => {
  const ComponentWithAuth = (props: any) => {
    const { user } = useAuthContext()
    const router = useRouter()
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
      if (!user) {
        setIsAuthorized(false)
        router.push("/notAuthorized")
        return
      }

      const permissions: TPermissionsObject = user.permissions || {}
      const path = router.pathname
      const firstSegment = path.split("/").filter(Boolean)[0]

      const isProtectedRoute = Object.keys(permissions).includes(firstSegment)

      if (isProtectedRoute) {
        const hasViewPermission =
          permissions[firstSegment as TSectionName]?.includes("view")
        if (!hasViewPermission) {
          setIsAuthorized(false)
          router.push("/notAuthorized")
          return
        }
      }
      setIsAuthorized(true)
    }, [user, router.pathname])

    return isAuthorized ? <WrappedComponent {...props} /> : null
  }

  ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name})`
  return ComponentWithAuth
}

export default withAuth
