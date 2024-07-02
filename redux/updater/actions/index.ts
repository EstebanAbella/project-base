import LocalDataService from '../../../services/LocalDataService'
import * as t from '../types'

export type updaterType = {
  needed: boolean
}

const AppVersion = {
  AppVer: process.env.NEXT_PUBLIC_APP_VERSION,
}

// PERIODIC CHECKER OF VERSION
export const checkUpdater = () => (dispatch: any) => {
  const check = setInterval(() => {
    dispatch({ type: t.CHECKER_UPDATE_FETCHING })
    const appVersion = LocalDataService.getVersion()
    const appVersionLocalStorage = window.localStorage.getItem('appVersion')
      ? window.localStorage.getItem('appVersion')
      : AppVersion.AppVer
    if (appVersionLocalStorage) {
      if (appVersion > appVersionLocalStorage) {
        dispatch({ type: t.CHECKER_UPDATE_FETCH, payload: true })
      } else {
        dispatch({ type: t.CHECKER_UPDATE_FETCH_ERROR, payload: false })
      }
    } else {
      dispatch({ type: t.CHECKER_UPDATE_FETCH_ERROR })
    }
  }, 10000)
  check
}

export const resetGlobal = () => (dispatch: any) => {
  dispatch({ type: t.RESET_GLOBAL })
}
