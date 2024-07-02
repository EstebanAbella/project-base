import React from 'react'

type GenericTitleTypeProps = {
  title: string
}

const GenericTitle = ({ title }: GenericTitleTypeProps) => {
  return (
    <section>
      <h2>{title}</h2>
    </section>
  )
}

export default GenericTitle
