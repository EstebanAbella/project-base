import React from "react"
import { ClientSelected } from "../../../view/ClientSelected/ClientSelected"

interface Props {
  params: {
    param: string
  }
}

const ClientSelectedPage = ({ params }: Props) => {
  return <ClientSelected param={params.param} />
}

export default ClientSelectedPage
