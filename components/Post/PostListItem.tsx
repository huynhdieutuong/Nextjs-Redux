import Image from 'next/image'
import React, { FC } from 'react'

interface ItemPropType {
  isProfile?: boolean
  isHideImage?: boolean
}

const PostListItem: FC<ItemPropType> = ({ isProfile, isHideImage }) => {
  const classProfile = isProfile ? 'col-lg-6' : null
  return (
    <div className={`ass1-section__item ${classProfile}`}>
      <div className='ass1-section'>
        <div className='ass1-section__head'>
          <a href='' className='ass1-section__avatar ass1-avatar'>
            <Image src='/images/avatar-02.png' alt='' width={38} height={38} />
          </a>
          <div>
            <a href='' className='ass1-section__name'>
              John Doe
            </a>
            <span className='ass1-section__passed'>2 hours ago</span>
          </div>
        </div>
        <div className='ass1-section__content'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et
            inventore obcaecati eum deserunt ut, aperiam quas! Placeat
            blanditiis consequatur, deserunt facere iusto amet a ad suscipit
            laudantium unde quidem perferendis!
          </p>
          {isHideImage ? null : (
            <div className='ass1-section__image'>
              <a href=''>
                <img src='/images/microphone-1209816_1920.jpg' alt='' />
              </a>
            </div>
          )}
        </div>
        <div className='ass1-section__footer'>
          <a href='#' className='ass1-section__btn-upvote ass1-btn-icon'>
            <i className='icon-Upvote' />
          </a>
          <a href='#' className='ass1-section__btn-downvote ass1-btn-icon'>
            <i className='icon-Downvote' />
          </a>
          <a href='#' className='ass1-section__btn-like ass1-btn-icon'>
            <i className='icon-Favorite_Full' />
            <span>1,274</span>
          </a>
          <a href='#' className='ass1-section__btn-comment ass1-btn-icon'>
            <i className='icon-Comment_Full' />
            <span>982</span>
          </a>
        </div>
      </div>
    </div>
  )
}

PostListItem.defaultProps = {
  isProfile: false,
  isHideImage: false,
}

export default PostListItem
