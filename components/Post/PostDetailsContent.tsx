import Link from 'next/link'
import React, { FC } from 'react'
import { CategoryType, PostType } from '../../interfaces/post'
import { CommentForm, CommentList } from '../Comment'
import PostListItem from './PostListItem'

interface PostDetailType {
  post: PostType
  postCategories: CategoryType[]
}

const PostDetailsContent: FC<PostDetailType> = ({ post, postCategories }) => {
  return (
    <div className='ass1-section__list'>
      <PostListItem post={post} isDetailPost={true} />

      <div className='list-categories'>
        <h5>
          <strong>Categories: </strong>
        </h5>
        <ul>
          {postCategories.map((cat) => {
            return (
              <li key={cat.id}>
                <Link href={`/categories/${cat.id}`}>
                  <a>{cat.text}</a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <CommentForm />

      <CommentList />
    </div>
  )
}

export default PostDetailsContent
