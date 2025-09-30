import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

const pathMappings: { [key: string]: string } = {
  clients: "Clientes",
  clientSelected: "Clientes",
  userSelected: "Usuarios",
  users: "Usuarios",
  reports: "Reportes",
  permissions: "Permisos",
  create: "",
}

type Breadcrumb = {
  href: string
  label: string
  isCurrent: boolean
}

export const useBreadcrumb = () => {
  const pathname = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>()

  useEffect(() => {
    if (!pathname) return
    let pathArray = pathname.replace("/panel/", "/").split("/")
    pathArray.shift()

    pathArray = pathArray.filter((path) => path !== "")

    const breadcrumbs = pathArray
      .filter((path) => pathMappings[path] !== "")
      .map((path, index) => {
        const pathMapped = pathMappings[path]
        let pathArraySlice

        if (pathArray.length > 1) {
          const positionPathArray = pathArray.indexOf(path)
          pathArraySlice = pathArray.slice(0, positionPathArray + 1).join("/")
        }

        const href = "/" + (pathArraySlice ?? path)
        return {
          href,
          label: pathMapped || path.charAt(0).toUpperCase() + path.slice(1),
          isCurrent: index === pathArray.length - 1,
        }
      })

    setBreadcrumbs(breadcrumbs)
  }, [pathname])

  return breadcrumbs
}
