import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentUserType } from '../../interfaces/user'
import { RootState } from '../store'
import { getCurrentUser } from './userActions'

interface StateType {
  currentUser: CurrentUserType | null
  loadingUser: boolean
}

const initialState: StateType = {
  currentUser: null,
  loadingUser: true,
}

const setDefaultAvatar = (currentUser: CurrentUserType) => {
  if (!currentUser.profilepicture)
    currentUser.profilepicture = '/images/avatar-02.png'
  return currentUser
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<CurrentUserType>) => {
      state.currentUser = setDefaultAvatar(action.payload)
      state.loadingUser = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.currentUser = setDefaultAvatar(action.payload)
      state.loadingUser = false
    }),
      builder.addCase(getCurrentUser.rejected, (state) => {
        state.currentUser = null
        state.loadingUser = false
      })
  },
})

export const selectCurrentUser = (state: RootState) => state.user.currentUser
export const selectLoadingUser = (state: RootState) => state.user.loadingUser

export default userSlice.reducer
