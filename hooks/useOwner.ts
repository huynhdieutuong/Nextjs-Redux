import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { PostType } from '../interfaces/post'
import { useAppSelector } from '../redux/hooks'
import {
  selectCurrentUser,
  selectLoadingUser,
} from '../redux/user/userReducers'

const useOwner = (post: PostType) => {
  const router = useRouter()
  const currentUser = useAppSelector(selectCurrentUser)
  const loadingUser = useAppSelector(selectLoadingUser)

  useEffect(() => {
    if (!loadingUser) {
      if (!currentUser) {
        router.push('/login')
      } else if (currentUser.USERID !== post.USERID) {
        router.push(`/posts/${post.PID}`)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, loadingUser])
}

export default useOwner
