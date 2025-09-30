import React from "react"
import UserSelected from "../../../view/UserSelected/UserSelected"

interface Props {
  params: {
    param: string
  }
}

const UserSelectedPage = ({ params }: Props) => {
  return <UserSelected param={params.param} />
}

export default UserSelectedPage
