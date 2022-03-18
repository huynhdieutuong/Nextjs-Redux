import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAppSelector } from '../redux/hooks'
import { selectCurrentUser } from '../redux/user/userReducers'

export function useAuthen(requiredLogin: boolean = true) {
  const router = useRouter()
  const currentUser = useAppSelector(selectCurrentUser)

  useEffect(() => {
    if (!currentUser && requiredLogin) {
      router.push('/login')
    }

    if (currentUser && !requiredLogin) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])
}
