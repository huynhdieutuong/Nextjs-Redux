import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { CurrentUserType } from '../../interfaces/user'
import userService from '../../services/user'

export const getCurrentUser = createAsyncThunk(
  'user/getCurrentUser',
  async (userId: number | null) => {
    try {
      const res = await userService.getUserById(userId)
      return res?.data?.user || null
    } catch (error) {
      return null
    }
  }
)

export const setCurrentUser = createAction<CurrentUserType | null>(
  'user/setCurrentUser'
)
