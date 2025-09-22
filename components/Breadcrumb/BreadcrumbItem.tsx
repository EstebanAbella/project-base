import Link from "next/link"
import { PropsWithChildren } from "react"

type BreadCrumbItemProps = PropsWithChildren<{
  href: string
  isCurrent: boolean
}>

export const BreadcrumbItem = ({
  children,
  href,
  isCurrent,
  ...props
}: BreadCrumbItemProps) => {
  return (
    <div {...props}>
      <Link href={href} passHref>
        <span>{children}</span>
      </Link>
    </div>
  )
}
