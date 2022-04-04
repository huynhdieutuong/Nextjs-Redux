import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppSelector } from '../redux/hooks'
import {
  selectCurrentUser,
  selectLoadingUser,
} from '../redux/user/userReducers'

const useAuthen = (requiredLogin: boolean = true) => {
  const router = useRouter()
  const currentUser = useAppSelector(selectCurrentUser)
  const loadingUser = useAppSelector(selectLoadingUser)

  useEffect(() => {
    if (!loadingUser && !currentUser && requiredLogin) {
      router.push('/login')
    }

    if (!loadingUser && currentUser && !requiredLogin) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, loadingUser])
}

export default useAuthen
