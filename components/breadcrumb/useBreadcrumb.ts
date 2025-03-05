import { useRouter } from "next/router"
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
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>()

  useEffect(() => {
    const pathWithoutQuery = router.asPath.split("?")[0]
    let pathArray = pathWithoutQuery.replace("/panel/", "/").split("/")
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
  }, [router.asPath])

  return breadcrumbs
}
