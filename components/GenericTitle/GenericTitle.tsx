import React from "react"

type GenericTitleTypeProps = {
  title: string
}

export const GenericTitle = ({ title }: GenericTitleTypeProps) => {
  return (
    <section>
      <h2>{title}</h2>
    </section>
  )
}
