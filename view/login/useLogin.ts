import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useDoLogin, useDoRestorePassword } from "./useLoginData"
import { ServerStatus } from "../../interface/global"
import { useAuthContext } from "../../context/auth/AuthContext"

export const useLogin = () => {
  const router = useRouter()
  const { loginStatus, restorePasswordStatus } = useAuthContext()

  const { useLoginHandler } = useDoLogin()
  const { useRestorePasswordHandler } = useDoRestorePassword()

  const [form, setForm] = useState({ email: "", password: "" })
  const [stateButton, setStateButton] = useState(true)
  const [userNameEmpty, setUserNameEmpty] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordEmpty, setPasswordEmpty] = useState(false)
  const [restorePassword, setRestorePassword] = useState(false)
  const [eventsButton, setEventsButton] = useState(false)
  const [sendEmail, setSendEmail] = useState(false)
  const [tryLogin, setTryLogin] = useState(false)

  const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
  const validPassword = /^(?=.*[a-z])([a-z]|[^ ]){4,15}$/

  useEffect(() => {
    if (
      restorePasswordStatus === ServerStatus.FETCH_ERROR ||
      restorePasswordStatus === ServerStatus.FETCHING
    ) {
      setEventsButton(false)
    }
  }, [restorePasswordStatus])

  useEffect(() => {
    if (loginStatus === ServerStatus.FETCH) {
      router.push("/clients")
    }
  }, [loginStatus])

  useEffect(() => {
    setStateButton(!(form.email !== "" || form.password !== ""))
    setRestorePassword(validEmail.test(form.email))
  }, [form])

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      sendEmail ? onRestorePassword() : handleLogin()
    }
  }

  const handleChange = (e: React.SyntheticEvent<EventTarget>) => {
    const name = (e.target as HTMLInputElement).name
    const value = (e.target as HTMLInputElement).value
    setForm({ ...form, [name]: value })
  }

  const validateForm = () => {
    const validatedEmail = validEmail.test(form.email)
    const validatedPassword = validPassword.test(form.password)
    setUserNameEmpty(!validatedEmail)
    setPasswordEmpty(!validatedPassword)
    return validatedEmail && validatedPassword
  }

  const handleLogin = async () => {
    if (validateForm() && !sendEmail) {
      setTryLogin(true)
      await useLoginHandler(form.email, form.password)
    }
  }

  const onRestorePassword = async () => {
    if (validEmail.test(form.email)) {
      setEventsButton(true)
      await useRestorePasswordHandler({
        email: form.email,
        location: window.location.origin,
        backoffice: false,
      })
    }
  }

  return {
    sendEmail,
    form,
    handleChange,
    handleKeyPress,
    userNameEmpty,
    showPassword,
    passwordEmpty,
    setShowPassword,
    loginStatus,
    handleLogin,
    stateButton,
    onRestorePassword,
    setSendEmail,
    restorePassword,
    eventsButton,
    restorePasswordStatus,
  }
}
