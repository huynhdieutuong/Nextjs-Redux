import React, { FC, useState } from 'react'
import { CommentType } from '../../interfaces/comment'
import CommentListItem from './CommentListItem'

interface CommentListType {
  comments: CommentType[]
}

const CommentList: FC<CommentListType> = ({ comments }) => {
  return (
    <div className='ass1-comments'>
      <div className='ass1-comments__head'>
        <div className='ass1-comments__title'>{comments?.length} comments</div>
        <div className='ass1-comments__options'>
          <span>Sort by:</span>
          <a href='#' className='ass1-comments__btn-upvote ass1-btn-icon'>
            <i className='icon-Upvote' />
          </a>
          <a href='#' className='ass1-comments__btn-down ass1-btn-icon'>
            <i className='icon-Downvote' />
          </a>
          <a href='#' className='ass1-comments__btn-expand ass1-btn-icon'>
            <i className='icon-Expand_all' />
          </a>
        </div>
      </div>

      {comments?.map((comment) => (
        <CommentListItem key={comment.CID} comment={comment} />
      ))}

      {/* <CommentListItem>
        <CommentListItem />
        <CommentListItem />
      </CommentListItem> */}
    </div>
  )
}

export default CommentList
