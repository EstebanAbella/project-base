import React from "react"
import Button, { ButtonType } from "../components/Button/Button"
import router from "next/router"

const notAuthorized = () => {
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

export default notAuthorized
