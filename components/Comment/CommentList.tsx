import React, { FC } from 'react'
import CommentListItem from './CommentListItem'

const CommentList: FC = () => {
  return (
    <div className='ass1-comments'>
      <div className='ass1-comments__head'>
        <div className='ass1-comments__title'>214 comments</div>
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

      <CommentListItem />

      <CommentListItem>
        <CommentListItem />
        <CommentListItem />
      </CommentListItem>

      <CommentListItem />
    </div>
  )
}

export default CommentList
