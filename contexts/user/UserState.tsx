import UserContext from './userContext'
import UserReducer from './userReducer'
import { SET_CURRENT_USER } from './types'
import { FC, useReducer } from 'react'

const UserState: FC = ({ children }) => {
  const initialState = {
    currentUser: {},
  }
  const [state, dispatch] = useReducer(UserReducer, initialState)
  const { currentUser } = state

  const setCurrentUser = (user: object) => {
    dispatch({
      type: SET_CURRENT_USER,
      payload: user,
    })
  }

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserState
