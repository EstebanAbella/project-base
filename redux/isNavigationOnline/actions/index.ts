import { useIsNavigationOnline } from '../../../hooks/useIsNavigationOnline'
import * as t from '../types'

export const isNavigationOnline =
  (state: boolean) => (dispatch: (v: any) => void) => {
    dispatch({
      type: t.IS_NAVIGATION_ONLINE_FETCH,
      payload: state,
    })
  }
