import React, { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuthContext } from "../context/auth/AuthContext"
import { TPermissionsObject, TSectionName } from "../interface/global"

function withAuth<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const ComponentWithAuth = (props: any) => {
    const { user } = useAuthContext()
    const router = useRouter()
    const pathname = usePathname()
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
      if (!user) {
        setIsAuthorized(false)
        router.replace("/notAuthorized")
        return
      }

      const permissions: TPermissionsObject = user.permissions || {}
      const firstSegment = pathname?.split("/").filter(Boolean)[0] ?? ""

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
    }, [user, pathname])

    return isAuthorized ? <WrappedComponent {...props} /> : null
  }

  ComponentWithAuth.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name})`
  return ComponentWithAuth
}

export default withAuth
