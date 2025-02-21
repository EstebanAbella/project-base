import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"
import { createWrapper } from "next-redux-wrapper"

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  })
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"]
export const wrapper = createWrapper(makeStore)
