import Image from 'next/image'
import React, { FC } from 'react'
import { PostType } from '../../interfaces/post'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
dayjs.extend(relativeTime)

interface ItemPropType {
  isProfile?: boolean
  isHideImage?: boolean
  isDetailPost?: boolean
  post: PostType
}

const PostListItem: FC<ItemPropType> = ({
  isProfile,
  isHideImage,
  isDetailPost,
  post,
}) => {
  if (!post) return null
  const classProfile = isProfile ? 'col-lg-6' : null
  return (
    <div className={`ass1-section__item ${classProfile}`}>
      <div className='ass1-section'>
        <div className='ass1-section__head'>
          <a href='' className='ass1-section__avatar ass1-avatar'>
            <img
              src={post.profilepicture || '/images/avatar-02.png'}
              alt=''
              width={38}
              height={38}
            />
          </a>
          <div>
            <a href='' className='ass1-section__name'>
              {post.fullname}
            </a>
            <span className='ass1-section__passed'>
              {dayjs(post.time_added).fromNow()}
            </span>
          </div>
        </div>
        <div className='ass1-section__content'>
          <p>{post.post_content}</p>
          {isHideImage ? null : (
            <div className='ass1-section__image'>
              <Link href={isDetailPost ? '#' : `/posts/${post.PID}`}>
                <a>
                  <img src={post.url_image} alt='' />
                </a>
              </Link>
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
  isDetailPost: false,
}

export default PostListItem
