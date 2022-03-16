import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import UserContext from '../contexts/user/userContext'

export function useAuthen() {
  const router = useRouter()
  const { loading, currentUser } = useContext(UserContext)

  useEffect(() => {
    if (!currentUser && !loading) {
      router.push('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, loading])
}

export function useNotAuthen() {
  const router = useRouter()
  const { loading, currentUser } = useContext(UserContext)

  useEffect(() => {
    if (currentUser && !loading) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, loading])
}
