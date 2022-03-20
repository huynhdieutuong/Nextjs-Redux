import Link from 'next/link'
import React from 'react'
import { useAppSelector } from '../../redux/hooks'
import { selectCurrentUser } from '../../redux/user/userReducers'
import { PostListItem } from '../Post'
import PostListByUser from '../Post/PostListByUser'

const YourPostsSidebar = () => {
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <aside className='ass1-aside'>
      <div className='ass1-content-head__t'>
        <div>Your latest posts</div>
      </div>
      {currentUser ? (
        <PostListByUser />
      ) : (
        <div>
          Please login to see this content{' '}
          <Link href='/login'>
            <a>Login</a>
          </Link>
        </div>
      )}
    </aside>
  )
}

export default YourPostsSidebar
