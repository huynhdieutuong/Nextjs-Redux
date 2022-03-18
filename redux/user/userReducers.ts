import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CurrentUserType } from '../../interfaces/user'
import { RootState } from '../store'

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
})

export const selectCurrentUser = (state: RootState) => state.user.currentUser

export default userSlice.reducer
