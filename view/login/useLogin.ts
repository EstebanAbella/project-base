import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { RootState } from "../../redux/rootReducer"
import { useDispatch, useSelector } from "react-redux"
import { doLogin, doRestorePassword } from "../../redux/auth/actions"
import { ServerStatus } from "../../interface/global"
import { AppDispatch } from "../../redux/store"

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { loginStatus, restorePasswordStatus } = useSelector(
    (state: RootState) => state.auth
  )
  const updateNeeded = useSelector(
    (state: RootState) => state.updater.updateNeeded
  )
  const router = useRouter()
  const [form, setForm] = useState({
    email: "",
    password: "",
  })
  const [stateButton, setStateButton] = useState(true)
  // Indicador de campo vacio del usuario
  const [userNameEmpty, setUserNameEmpty] = useState(false)
  // Visibilidad Contraseña
  const [showPassword, setShowPassword] = useState(false)
  // Indicador de campo vacio de la contraseña
  const [passwordEmpty, setPasswordEmpty] = useState(false)
  // Restablecer contraseña
  const [restorePassword, setRestorePassword] = useState(false)
  // Feedback restablecer contraseña
  const [eventsButton, setEventsButton] = useState(false)
  // Enviar email
  const [sendEmail, setSendEmail] = useState(false)
  // Try login
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
    if (loginStatus === ServerStatus.FETCH && !updateNeeded)
      router.push("/clients")
  }, [loginStatus])

  useEffect(() => {
    if (form.email !== "" || form.password !== "") {
      setStateButton(false)
    } else {
      setStateButton(true)
    }

    if (validEmail.test(form.email)) {
      setRestorePassword(true)
    } else {
      setRestorePassword(false)
    }
  }, [form])

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !sendEmail) {
      event.preventDefault()
      handleLogin()
    }
    if (event.key === "Enter" && sendEmail) {
      event.preventDefault()
      onRestorePassword()
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
    if (validatedEmail) {
      setUserNameEmpty(false)
    } else {
      setUserNameEmpty(true)
    }
    if (validatedPassword) {
      setPasswordEmpty(false)
    } else {
      setPasswordEmpty(true)
    }
    if (validatedEmail && validatedPassword) {
      return true
    } else {
      return false
    }
  }

  const handleLogin = () => {
    if (validateForm() && !sendEmail) {
      setTryLogin(true)
      dispatch(doLogin(form))
    }
  }

  const onRestorePassword = () => {
    if (validEmail.test(form.email)) {
      setEventsButton(true)
      dispatch(
        doRestorePassword({
          email: form.email,
          location: `${window.location.origin}`,
          backoffice: false,
        })
      )
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
