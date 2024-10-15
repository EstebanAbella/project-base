import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { RootState } from "../redux/rootReducer"
import { connect } from "react-redux"
import Button, { ButtonType } from "../components/Button"
import { doLogin, doRestorePassword } from "../redux/auth/actions"
import { ServerStatus } from "../Utils/Types/global"
import { Logo } from "../components/Logo"

const mapStateToProps = (state: RootState) => {
  const authReducer = state.auth
  const updaterReducer = state.updater
  return {
    loginStatus: authReducer.loginStatus,
    restorePasswordStatus: authReducer.restorePasswordStatus,
    updateNeeded: updaterReducer.updateNeeded,
  }
}

const mapDispatchToProps = {
  doLogin,
  doRestorePassword,
}

export type LoginPropType = {
  doLogin: Function
  loginStatus: ServerStatus
  doRestorePassword: Function
  restorePasswordStatus: ServerStatus
  updateNeeded: boolean
}

function Login({
  doLogin,
  loginStatus,
  restorePasswordStatus,
  doRestorePassword,
  updateNeeded,
}: LoginPropType) {
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
      router.push("/botTraining")
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
      doLogin(form)
    }
  }

  const onRestorePassword = () => {
    if (validEmail.test(form.email)) {
      setEventsButton(true)
      doRestorePassword({
        email: form.email,
        location: `${window.location.origin}`,
        backoffice: false,
      })
    }
  }

  return (
    <main>
      <div className='imageLogin'></div>
      <div className='containerLoginForm'>
        <form>
          <div className='logoContainer'>
            <h1>Rosbot</h1>
            {/* <Logo width='240' srcLogo={""} /> */}
          </div>
          {!sendEmail ? (
            <h1 className='titleLogin'>Bienvenido/a.</h1>
          ) : (
            <h1 className='titleLogin'>Recuperar contraseña.</h1>
          )}
          <div className='textField'>
            <label>Ingresa tu correo electrónico</label>
            <input
              name='email'
              value={form.email}
              placeholder='example@mail.com'
              type='email'
              disabled={false}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyPress(e)}
              className={`${userNameEmpty ? "inputError" : ""}`}
            />

            <div className='messageForm'>
              {userNameEmpty && (
                <p style={{ color: "red" }}>
                  Mail no válido, prueba con otro mail.
                </p>
              )}
            </div>
          </div>

          {!sendEmail && (
            <div className='textField'>
              <label>Contraseña</label>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                value={form.password}
                placeholder='Escribe tu contraseña'
                required
                onChange={handleChange}
                onKeyDown={(e) => handleKeyPress(e)}
                className={`input ${passwordEmpty ? "inputError" : ""}`}
              />
              <span
                className={showPassword ? "icon-eye" : "icon-eye-off"}
                id={"icon"}
                onClick={() => setShowPassword(!showPassword)}
              ></span>
              <div className='messageForm'>
                {passwordEmpty ? (
                  <p style={{ color: "red" }}>Debes usar 8 o más caracteres</p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          )}

          <div className='messageForm'>
            {loginStatus === ServerStatus.FETCH_ERROR && !sendEmail && (
              <p style={{ color: "red", textAlign: "center" }}>
                Las credenciales no son válidas
              </p>
            )}
          </div>

          <div className='buttonContainerForm'>
            {!sendEmail ? (
              <Button
                value={
                  loginStatus === ServerStatus.FETCHING
                    ? "Cargando"
                    : "Iniciar sesión"
                }
                type={ButtonType.PRIMARY}
                onClick={(e) => {
                  e.preventDefault(), handleLogin()
                }}
                disabled={stateButton}
              />
            ) : (
              <Button
                value={"Enviar E-mail"}
                type={ButtonType.PRIMARY}
                onClick={() => onRestorePassword()}
                disabled={stateButton}
              />
            )}

            {!sendEmail && (
              <div className='messageForm'>
                <p>
                  ¿Olvidaste tu contraseña?{" "}
                  <a
                    onClick={() => setSendEmail(restorePassword ? true : false)}
                    style={{
                      cursor: `${restorePassword ? "pointer" : "default"}`,
                      pointerEvents: `${eventsButton ? "none" : "auto"}`,
                    }}
                  >
                    Recuperala aquí
                  </a>
                </p>
              </div>
            )}

            {restorePasswordStatus === ServerStatus.FETCH && (
              <div className='messageForm'>
                <p>Enviamos un e-mail a su correo electrónico, revíselo</p>
              </div>
            )}
            {restorePasswordStatus === ServerStatus.FETCH_ERROR && (
              <div className='messageForm'>
                <p>Error al enviar correo electrónico.</p>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
