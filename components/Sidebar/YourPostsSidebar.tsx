import Link from 'next/link'
import React from 'react'
import { PostListItem } from '../Post'

const YourPostsSidebar = () => {
  return (
    <aside className='ass1-aside'>
      <div className='ass1-content-head__t'>
        <div>Your latest posts</div>
      </div>
      <div>
        Please login to see this content{' '}
        <Link href='/login'>
          <a>Login</a>
        </Link>
      </div>

      {/* <PostListItem isHideImage />
      <PostListItem isHideImage />
      <PostListItem isHideImage />
      <PostListItem isHideImage />
      <PostListItem isHideImage /> */}
    </aside>
  )
}

export default YourPostsSidebar
