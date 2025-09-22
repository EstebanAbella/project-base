import { ServerStatus } from "../../interface/global"
import { Button } from "../../components/Button"
import { ButtonType } from "../../components/Button/Button"
import { useLogin } from "./useLogin"
import { FormGeneric } from "../../components/FormGeneric"

export const Login = () => {
  const {
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
  } = useLogin()

  return (
    <main>
      <div className='imageLogin'></div>
      <div className='containerLoginForm'>
        <FormGeneric>
          <div className='logoContainer'>
            <h1>Project base</h1>
            {/* <Logo width='240' srcLogo={""} /> */}
          </div>
          {!sendEmail ? (
            <h1 className='titleLogin'>Welcome</h1>
          ) : (
            <h1 className='titleLogin'>Recover password</h1>
          )}
          <div className='textField'>
            <label>Enter your email address</label>
            <input
              name='email'
              value={form.email}
              placeholder='example@mail.com'
              type='email'
              disabled={false}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyPress(e)}
              className={`${userNameEmpty ? "inputError" : ""}`}
              autoComplete='username'
            />

            <div className='messageForm'>
              {userNameEmpty && (
                <p style={{ color: "red" }}>Invalid email, try another one</p>
              )}
            </div>
          </div>

          {!sendEmail && (
            <div className='textField'>
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                value={form.password}
                placeholder='Enter your password'
                required
                onChange={handleChange}
                onKeyDown={(e) => handleKeyPress(e)}
                className={`input ${passwordEmpty ? "inputError" : ""}`}
                autoComplete={"current-password"}
              />
              <span
                className={showPassword ? "icon-eye" : "icon-eye-off"}
                id={"icon"}
                onClick={() => setShowPassword(!showPassword)}
              ></span>
              <div className='messageForm'>
                {passwordEmpty ? (
                  <p style={{ color: "red" }}>
                    You must use 8 or more characters
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>
          )}

          <div className='messageForm'>
            {loginStatus === ServerStatus.FETCH_ERROR && !sendEmail && (
              <p style={{ color: "red", textAlign: "center" }}>
                Credentials are not valid
              </p>
            )}
          </div>

          <div className='buttonContainerForm'>
            {!sendEmail ? (
              <Button
                value={
                  loginStatus === ServerStatus.FETCHING ? "Loading" : "Log in"
                }
                type={ButtonType.LOGIN}
                onClick={(e) => {
                  e.preventDefault(), handleLogin()
                }}
                disabled={stateButton}
              />
            ) : (
              <Button
                value={"Send email"}
                type={ButtonType.LOGIN}
                onClick={() => onRestorePassword()}
                disabled={stateButton}
              />
            )}

            {!sendEmail && (
              <div className='messageForm'>
                <p style={{ width: "100%", textAlign: "center" }}>
                  Forgot your password?{" "}
                  <a
                    onClick={() => setSendEmail(restorePassword ? true : false)}
                    style={{
                      cursor: `${restorePassword ? "pointer" : "default"}`,
                      pointerEvents: `${eventsButton ? "none" : "auto"}`,
                    }}
                  >
                    Recover it here
                  </a>
                </p>
              </div>
            )}

            {restorePasswordStatus === ServerStatus.FETCH && (
              <div className='messageForm'>
                <p>We sent an email to your inbox, please check it</p>
              </div>
            )}
            {restorePasswordStatus === ServerStatus.FETCH_ERROR && (
              <div className='messageForm'>
                <p style={{ color: "red", textAlign: "center" }}>
                  Error sending email
                </p>
              </div>
            )}
          </div>
        </FormGeneric>
        <section className='credentials'>
          <h6>Credentials:</h6>
          <p>E-mail: admin@admin.com</p>
          <p>Password: admin</p>
          <p>E-mail: user@user.com</p>
          <p>Password: user</p>
        </section>
      </div>
    </main>
  )
}
