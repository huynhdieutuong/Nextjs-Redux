import React, { FC } from 'react'

const PostDetailForm: FC = () => {
  return (
    <div className='ass1-section ass1-section__edit-post'>
      <div className='ass1-section__content'>
        <form action='#'>
          <div className='form-group'>
            <input
              type='text'
              className='form-control ttg-border-none'
              placeholder='https://'
            />
          </div>
          <div className='form-group'>
            <textarea
              className='form-control ttg-border-none'
              placeholder='Describe ...'
              defaultValue={''}
            />
          </div>
        </form>
        <div className='ass1-section__image'>
          <a href='#'>
            <img src='/images/no_image_available.jpg' alt='default' />
          </a>
        </div>
        <a
          href='https://memeful.com/generator'
          target='_blank'
          rel='noreferrer'
          className='ass1-btn ass1-btn-meme'
        >
          Create photo from meme
        </a>
        <a href='#' className='ass1-btn ass1-btn-meme'>
          Post photo from computer
        </a>
      </div>
    </div>
  )
}

export default PostDetailForm
