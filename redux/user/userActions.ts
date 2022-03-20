import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { CurrentUserType } from '../../interfaces/user'

export const setCurrentUser = createAction<CurrentUserType | null>(
  'user/setCurrentUser'
)
