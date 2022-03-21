import React, { FC } from 'react'
import { PostType } from '../../interfaces/post'
import { CommentForm, CommentList } from '../Comment'
import PostListItem from './PostListItem'

interface PostDetailType {
  post: PostType
}

const PostDetailsContent: FC<PostDetailType> = ({ post }) => {
  return (
    <div className='ass1-section__list'>
      <PostListItem post={post} isDetailPost={true} />

      <CommentForm />

      <CommentList />
    </div>
  )
}

export default PostDetailsContent
