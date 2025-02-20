import { Children, PropsWithChildren } from "react"
import { BreadcrumbItem } from "./BreadcrumbItem"

type BreadcrumbProps = PropsWithChildren<{}>

export const Breadcrumb = ({ children }: BreadcrumbProps) => {
  const childrenArray = Children.toArray(children)
  const childrenWithSeparator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <div className={`breadItemContainer`} key={index}>
          {child}
          {">"}
        </div>
      )
    }
    return (
      <div className={`breadItemContainer`} key={index}>
        {child}
      </div>
    )
  })

  return <div className={`breadContainer`}>{childrenWithSeparator}</div>
}

Breadcrumb.Item = BreadcrumbItem
