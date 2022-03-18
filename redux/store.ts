import { configureStore } from '@reduxjs/toolkit'
import userReducers from './user/userReducers'

export const store = configureStore({
  reducer: {
    user: userReducers,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
