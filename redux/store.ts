import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true
  })

export const wrapper = createWrapper(makeStore)
