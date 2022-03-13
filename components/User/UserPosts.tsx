import React from 'react'
import { PostListItem } from '../Post'

const UserPosts = () => {
  return (
    <div className='ass1-section__wrap row ass1-section__isotope-init'>
      <PostListItem isProfile />
      <PostListItem isProfile />
      <PostListItem isProfile />
      <PostListItem isProfile />
      <PostListItem isProfile />
      <PostListItem isProfile />
    </div>
  )
}

export default UserPosts
