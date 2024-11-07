import { Children, PropsWithChildren } from "react"
import { BreadcrumbItem } from "./BreadcrumbItem"
import styles from "./Breadcrumb.module.scss"

type BreadcrumbProps = PropsWithChildren<{}>

const Breadcrumb = ({ children }: BreadcrumbProps) => {
  const childrenArray = Children.toArray(children)
  const childrenWithSeparator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <div className={`${styles.breadItemContainer}`} key={index}>
          {child}
          {">"}
        </div>
      )
    }
    return (
      <div className={`${styles.breadItemContainer}`} key={index}>
        {child}
      </div>
    )
  })

  return (
    <div className={`${styles.breadContainer}`}>{childrenWithSeparator}</div>
  )
}

Breadcrumb.Item = BreadcrumbItem

export default Breadcrumb
