import { configureStore, ThunkAction } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { Action } from 'redux'
import postReducers from './post/postReducers'
import userReducers from './user/userReducers'

const store = () =>
  configureStore({
    reducer: {
      user: userReducers,
      post: postReducers,
    },
  })

export type AppStore = ReturnType<typeof store>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>

export const wrapper = createWrapper<AppStore>(store)
