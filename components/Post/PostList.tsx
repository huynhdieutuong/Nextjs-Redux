import React, { FC } from 'react'
import PostListItem from './PostListItem'

const PostList: FC = () => {
  return (
    <div className='ass1-section__list'>
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <button className='load-more ass1-btn'>
        <span>Load more</span>
      </button>
    </div>
  )
}

export default PostList
