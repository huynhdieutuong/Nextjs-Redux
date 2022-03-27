import React, { FC } from 'react'
import Masonry from 'react-masonry-component'
import { PostType } from '../../interfaces/post'
import { Button } from '../Button'
import PostListItem from './PostListItem'

interface PostListType {
  postList: PostType[]
  handleLoadMore?: () => void
  isLoading?: boolean
}

const PostListNoSidebar: FC<PostListType> = ({
  postList,
  handleLoadMore,
  isLoading,
}) => {
  return (
    <div className='container' style={{ marginTop: '30px' }}>
      <Masonry className='ass1-section__wrap row ass1-section__isotope-init'>
        {postList.map((post) => (
          <PostListItem isNoSidebar key={post.PID} post={post} />
        ))}
        {handleLoadMore && (
          <div>
            <Button
              className='load-more ass1-btn'
              onClick={handleLoadMore}
              isLoading={isLoading}
              disabled={isLoading}
            >
              Load more
            </Button>
          </div>
        )}
      </Masonry>
    </div>
  )
}

export default PostListNoSidebar
