import UserContext from './userContext'
import UserReducer from './userReducer'
import { SET_CURRENT_USER } from './types'
import { FC, useReducer } from 'react'
import { CurrentUserType } from '../../interfaces/user'

interface IntitalStateType {
  currentUser: CurrentUserType | null
  loading: boolean
}

const UserState: FC = ({ children }) => {
  const initialState: IntitalStateType = {
    currentUser: null,
    loading: true,
  }
  const [state, dispatch] = useReducer(UserReducer, initialState)
  const { currentUser, loading } = state

  const setCurrentUser = (user: object) => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: user,
    })
  }

  return (
    <UserContext.Provider
      value={{
        loading,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserState
