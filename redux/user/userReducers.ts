import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentUserType } from '../../interfaces/user'
import { AppThunk, RootState } from '../store'
import { HYDRATE } from 'next-redux-wrapper'
import userService from '../../services/user'

interface StateType {
  currentUser: CurrentUserType | null
}

const initialState: StateType = {
  currentUser: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUserType>) => {
      state.currentUser = action.payload
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.currentUser = action.payload.user.currentUser
    },
  },
})

export const selectCurrentUser = (state: RootState) => state.user.currentUser

export default userSlice.reducer
