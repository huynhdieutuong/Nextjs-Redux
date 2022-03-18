import { createAction, createAsyncThunk } from '@reduxjs/toolkit'

export const setCurrentUser = createAction('user/setCurrentUser', (user) => {
  return { payload: user }
})
