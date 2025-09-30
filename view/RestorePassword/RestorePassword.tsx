"use client"
import React, { useEffect, useState } from "react"
import { ServerStatus } from "../../interface/global"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader } from "../../components/Loader/Loader"
import { Button } from "../../components/Button"
import { ButtonType } from "../../components/Button/Button"
import { useAuthContext } from "../../context/auth/AuthContext"
import { useDoRestorePasswordValidated } from "../Login/useLoginData"

export const RestorePassword = () => {
  const { restorePasswordValidatedStatus } = useAuthContext()

  const { useRestorePasswordValidatedHandler } = useDoRestorePasswordValidated()
  // Datos de la contraseña
  const [password, setPassword] = useState("")
  // Visibilidad Contraseña
  const [showPassword, setShowPassword] = useState<boolean>(false)
  // Indicador de campo vacio de la contraseña
  const [passwordEmpty, setPasswordEmpty] = useState<boolean>(false)
  // Token
  const [tokenParams, setTokenParams] = useState("")
  // Repetir contraseña
  // Visibilidad Contraseña
  const [showPasswordRepeated, setShowPasswordRepeated] =
    useState<boolean>(false)
  // Datos de la contraseña
  const [passwordRepeated, setPasswordRepeated] = useState("")
  // Indicador de campo vacio de la contraseña
  const [passwordRepeatedEmpty, setPasswordRepeatedEmpty] =
    useState<boolean>(false)
  // Estado del botton
  const [stateButton, setStateButton] = useState<boolean>(true)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams?.get("token")
    if (token) setTokenParams(token)
  }, [searchParams])

  useEffect(() => {
    if (restorePasswordValidatedStatus === ServerStatus.FETCH) {
      router.push("/login")
    }
  }, [restorePasswordValidatedStatus])

  useEffect(() => {
    if (password === "" && passwordRepeated === "") return
    if (validateForm() && tokenParams !== "") {
      setStateButton(false)
    } else {
      setStateButton(true)
    }
  }, [password, passwordRepeated])

  const handleClick = () => {
    if (validateForm() && tokenParams !== "") {
      useRestorePasswordValidatedHandler({
        newPassword: password,
        token: tokenParams,
      })
    }
  }

  const validateForm = () => {
    if (password === "" || password.length < 8) {
      setPasswordEmpty(true)
    } else {
      setPasswordEmpty(false)
    }

    if (passwordRepeated === "" || passwordRepeated !== password) {
      setPasswordRepeatedEmpty(true)
    } else {
      setPasswordRepeatedEmpty(false)
    }

    if (
      password === "" ||
      password.length < 8 ||
      passwordRepeated === "" ||
      passwordRepeated !== password
    ) {
      return false
    } else {
      return true
    }
  }

  return (
    <form>
      <img src='/logo.png' width={"80%"} alt='logo' />
      <h1>Restore Password</h1>

      <div className='inputPasswordContainer'>
        <input
          type={showPassword ? "text" : "password"}
          name='password'
          value={password}
          placeholder='Password'
          required
          onChange={(e) => setPassword(e.target.value)}
          className='input'
        />
        <span
          className={
            showPassword ? "icon-passwordVisible" : "icon-passwordHidden"
          }
          id={"icon"}
          onClick={() => setShowPassword(!showPassword)}
        ></span>
      </div>
      <div className='messageForm'>
        {passwordEmpty ? "Debes usar 8 o más caracteres" : ""}
      </div>

      <div className='inputPasswordContainer'>
        <input
          type={showPasswordRepeated ? "text" : "password"}
          name='passwordRepeated'
          value={passwordRepeated}
          placeholder='Password Repeated'
          required
          onChange={(e) => setPasswordRepeated(e.target.value)}
          className='input'
        />
        <span
          className={
            showPasswordRepeated
              ? "icon-passwordVisible"
              : "icon-passwordHidden"
          }
          id={"icon"}
          onClick={() => setShowPasswordRepeated(!showPasswordRepeated)}
        ></span>
      </div>
      <div className='messageForm'>
        {passwordEmpty ? "Las contraseñas deben coincidir" : ""}
      </div>

      <div
        className='messageForm'
        style={{
          marginBottom: "5px",
        }}
      >
        {restorePasswordValidatedStatus === ServerStatus.FETCH_ERROR && (
          <p style={{ color: "red", margin: "0" }}>
            Error al cambiar contraseña
          </p>
        )}
      </div>

      <Button
        value={
          restorePasswordValidatedStatus === ServerStatus.FETCHING
            ? "Cargando"
            : "Cambiar contraseña"
        }
        type={ButtonType.PRIMARY}
        onClick={handleClick}
        disabled={stateButton}
      />

      <div className='messageForm'>
        {restorePasswordValidatedStatus === ServerStatus.FETCHING && <Loader />}
      </div>
    </form>
  )
}
