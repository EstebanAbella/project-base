import React, { useEffect, useState } from "react"

export enum ThemeType {
  THEMEDARK = "themeDark",
  THEMELIGHT = "themeLight",
}

const ChangeTheme = () => {
  const [stateCheck, setStateCheck] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const body = document.querySelector("body")
    if (!body) return
    const bodyClass = body.className
    if (!bodyClass) return
    if (bodyClass === ThemeType.THEMEDARK) {
      setStateCheck(true)
    } else {
      setStateCheck(false)
    }
    setLoading(true)
  }, [])

  const handleChangeTheme = () => {
    const body = document.querySelector("body")
    if (!body) return
    const bodyClass = body.className
    if (!bodyClass) return
    body.classList.remove(bodyClass)
    body.classList.add(
      bodyClass === ThemeType.THEMEDARK
        ? ThemeType.THEMELIGHT
        : ThemeType.THEMEDARK
    )
    setStateCheck(!stateCheck)
  }

  const handleCheckboxChange = () => {
    handleChangeTheme()
  }

  return (
    <>
      {loading && (
        <>
          <input
            type={"checkbox"}
            tabIndex={1}
            className={"checkboxInput"}
            autoComplete={"off"}
            name={"checkList"}
            id={"checkList"}
            onChange={handleCheckboxChange}
            checked={stateCheck}
          />
          <label className={"checkboxLabel"} tabIndex={0} htmlFor={"checkList"}>
            <span></span>
          </label>
        </>
      )}
    </>
  )
}

export default ChangeTheme
