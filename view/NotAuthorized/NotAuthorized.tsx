import React from "react"
import router from "next/router"
import { Button, ButtonType } from "../../components/Button/Button"

export const NotAuthorized = () => {
  const handleClick = () => {
    router.push("/clients")
  }

  return (
    <div className='notAuthorized'>
      <h1>Not Authorized</h1>
      <Button
        type={ButtonType.PRIMARY}
        value={"Redirect"}
        onClick={handleClick}
      ></Button>
    </div>
  )
}
