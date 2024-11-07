import { useRouter } from "next/router"
import { PropsWithChildren } from "react"
import Breadcrumb from "../../components/breadcrumb/Breadcrumb"
import { BreadcrumbItem } from "../../components/breadcrumb/BreadcrumbItem"
import { useBreadcrumb } from "../../components/breadcrumb/useBreadcrumb"
import styles from "../../components/breadcrumb/Breadcrumb.module.scss"

type BreadcrumbWrapperProps = PropsWithChildren<{}>

export const BreadcrumbWrapper = ({ children }: BreadcrumbWrapperProps) => {
  const router = useRouter()
  const breadcrumbs = useBreadcrumb()

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem isCurrent={router.pathname === "/"} href='/botTraining'>
          <span className={`icon-home ${styles.breadHomeIcon}`} />
        </BreadcrumbItem>
        {breadcrumbs &&
          breadcrumbs.map((breadcrumb) => (
            <BreadcrumbItem
              key={breadcrumb.href}
              href={breadcrumb.href}
              isCurrent={breadcrumb.isCurrent}
            >
              {breadcrumb.label}
            </BreadcrumbItem>
          ))}
      </Breadcrumb>
      {children}
    </div>
  )
}
