import React, { FC } from 'react'

const CommentListItem: FC = ({ children }) => {
  return (
    <div className='ass1-comments__section'>
      <a href='#' className='ass1-comments__avatar ass1-avatar'>
        <img src='/images/avatar-02.png' alt='' />
      </a>
      <div className='ass1-comments__content'>
        <a href='#' className='ass1-comments__name'>
          James{' '}
        </a>
        <span className='ass1-comments__passed'>12 hours ago</span>
        <a href='#' className='ass1-comments__btn-reply ass1-btn-icon'>
          <i className='icon-Reply'> Reply</i>
        </a>
        <p>
          Scratch off globe, for when you want to wipe out any country that
          displeases you but lack the weaponry to do so.
        </p>
        <div className='ass1-comments__info'>
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
        </div>
        {children}
      </div>
    </div>
  )
}

export default CommentListItem
