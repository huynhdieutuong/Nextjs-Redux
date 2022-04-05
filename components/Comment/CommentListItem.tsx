import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import React, { FC } from 'react'
import { CommentType } from '../../interfaces/comment'
dayjs.extend(relativeTime)

interface CommentListItemType {
  comment: CommentType
}

const CommentListItem: FC<CommentListItemType> = ({ children, comment }) => {
  return (
    <div className='ass1-comments__section'>
      <Link href={`/users/${comment.USERID}`}>
        <a className='ass1-comments__avatar ass1-avatar'>
          <img src={comment.profilepicture} alt='' />
        </a>
      </Link>
      <div className='ass1-comments__content'>
        <Link href={`/users/${comment.USERID}`}>
          <a className='ass1-comments__name'>{comment.fullname} </a>
        </Link>
        <span className='ass1-comments__passed'>
          {dayjs(comment.time_added).fromNow()}
        </span>
        {/* <a href='#' className='ass1-comments__btn-reply ass1-btn-icon'>
          <i className='icon-Reply'> Reply</i>
        </a> */}
        <p>{comment.comment}</p>
        {/* <div className='ass1-comments__info'>
          <a href='#' className='ass1-comments__btn-upvote ass1-btn-icon'>
            <i className='icon-Upvote' />
            <span>901</span>
          </a>
          <a href='#' className='ass1-comments__btn-down ass1-btn-icon'>
            <i className='icon-Downvote' />
            <span>36</span>
          </a>
          <a href='#' className='ass1-comments__btn-flag ass1-btn-icon'>
            <i className='icon-Flag' />
          </a>
        </div> */}
        {children}
      </div>
    </div>
  )
}

export default CommentListItem
