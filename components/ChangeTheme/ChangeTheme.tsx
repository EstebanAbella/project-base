import React, { useEffect, useState } from "react"

export enum ThemeType {
  THEMEDARK = "themeDark",
  THEMELIGHT = "themeLight",
}

export const ChangeTheme = () => {
  const [stateCheck, setStateCheck] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as ThemeType | null
    const body = document.querySelector("body")
    if (!body) return

    const themeToApply = savedTheme || ThemeType.THEMELIGHT
    body.classList.remove(ThemeType.THEMEDARK, ThemeType.THEMELIGHT)
    body.classList.add(themeToApply)

    setStateCheck(themeToApply === ThemeType.THEMEDARK)
    setLoading(true)
  }, [])

  const handleChangeTheme = () => {
    const body = document.querySelector("body")
    if (!body) return

    const newTheme = body.classList.contains(ThemeType.THEMEDARK)
      ? ThemeType.THEMELIGHT
      : ThemeType.THEMEDARK

    body.classList.remove(ThemeType.THEMEDARK, ThemeType.THEMELIGHT)
    body.classList.add(newTheme)

    localStorage.setItem("theme", newTheme)

    setStateCheck(newTheme === ThemeType.THEMEDARK)
  }

  return (
    <>
      {loading && (
        <>
          <input
            type='checkbox'
            tabIndex={1}
            className='checkboxInput'
            autoComplete='off'
            name='checkList'
            id='checkList'
            onChange={handleChangeTheme}
            checked={stateCheck}
          />
          <label className='checkboxLabel' tabIndex={0} htmlFor='checkList'>
            <span></span>
          </label>
        </>
      )}
    </>
  )
}
