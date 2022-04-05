import Link from 'next/link'
import React, { FC, useState } from 'react'
import { CommentType } from '../../interfaces/comment'
import { CategoryType, PostType } from '../../interfaces/post'
import { CommentForm, CommentList } from '../Comment'
import PostListItem from './PostListItem'

interface PostDetailType {
  post: PostType
  postCategories: CategoryType[]
  comments: CommentType[]
}

const PostDetailsContent: FC<PostDetailType> = ({
  post,
  postCategories,
  comments,
}) => {
  const [commentsList, setCommentsList] = useState(comments)

  return (
    <div className='ass1-section__list'>
      <PostListItem post={post} isDetailPost={true} comments={commentsList} />

      <div className='list-categories'>
        <h5>
          <strong>Categories: </strong>
        </h5>
        <ul>
          {postCategories?.map((cat) => {
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

      <CommentForm
        postid={post?.PID}
        comments={commentsList}
        setComments={setCommentsList}
      />

      <CommentList comments={commentsList} />
    </div>
  )
}

export default PostDetailsContent
