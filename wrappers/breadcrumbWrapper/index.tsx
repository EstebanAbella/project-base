import { useRouter } from "next/router"
import { PropsWithChildren } from "react"
import { BreadcrumbItem } from "../../components/Breadcrumb/BreadcrumbItem"
import { useBreadcrumb } from "../../components/Breadcrumb/useBreadcrumb"
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb"

type BreadcrumbWrapperProps = PropsWithChildren<{}>

export const BreadcrumbWrapper = ({ children }: BreadcrumbWrapperProps) => {
  const router = useRouter()
  const breadcrumbs = useBreadcrumb()

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem isCurrent={router.pathname === "/"} href='/clients'>
          <span className='icon-home breadHomeIcon' />
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
