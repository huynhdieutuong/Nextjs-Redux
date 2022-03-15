import { SET_CURRENT_USER } from './types'

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: any, action: any) => {
  const { type, payload } = action

  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      }
    default:
      return state
  }
}
