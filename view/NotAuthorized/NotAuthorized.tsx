"use client"
import { useRouter } from "next/navigation"
import { Button, ButtonType } from "../../components/Button/Button"

export const NotAuthorized = () => {
  const router = useRouter()
  return (
    <div className='notAuthorized'>
      <h1>Not Authorized</h1>
      <Button
        type={ButtonType.PRIMARY}
        value={"Redirect"}
        onClick={() => router.push("/clients")}
      ></Button>
    </div>
  )
}
