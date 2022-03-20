import React, { FC } from 'react'
import { PostType } from '../../interfaces/post'
import { Button } from '../Button'
import PostListItem from './PostListItem'

interface PostListType {
  postList: PostType[]
  handleLoadMore: () => void
  isLoading: boolean
}

const PostList: FC<PostListType> = ({
  postList,
  handleLoadMore,
  isLoading,
}) => {
  return (
    <div className='ass1-section__list'>
      {postList.map((post) => (
        <PostListItem key={post.PID} post={post} />
      ))}
      <Button
        className='load-more ass1-btn'
        onClick={handleLoadMore}
        isLoading={isLoading}
      >
        Load more
      </Button>
    </div>
  )
}

export default PostList
