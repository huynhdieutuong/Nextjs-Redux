import React from 'react'
import { CommentForm, CommentList } from '../Comment'
import PostListItem from './PostListItem'

const PostDetailsContent = () => {
  return (
    <div className='ass1-section__list'>
      {/* <PostListItem /> */}

      <CommentForm />

      <CommentList />
    </div>
  )
}

export default PostDetailsContent
