import React, { FC } from 'react'

const CommentForm: FC = () => {
  return (
    <div className='ass1-add-comment'>
      <form action='#'>
        <input
          type='text'
          className='form-control ttg-border-none'
          placeholder='Add a comment'
        />
      </form>
      <div className='ass1-add-comment__content'>
        <a href='#' className='ass1-add-comment__btn-save ass1-btn-icon'>
          <span>180</span>
          <i className='icon-Submit_Tick' />
        </a>
      </div>
    </div>
  )
}

export default CommentForm
