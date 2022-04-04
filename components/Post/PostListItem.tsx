import Image from 'next/image'
import React, { FC, RefObject, useRef, useState } from 'react'
import { PostType } from '../../interfaces/post'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { useOuterClick } from '../../hooks'
import { useAppSelector } from '../../redux/hooks'
import { selectCurrentUser } from '../../redux/user/userReducers'
dayjs.extend(relativeTime)

interface ItemPropType {
  isNoSidebar?: boolean
  isHideImage?: boolean
  isDetailPost?: boolean
  post: PostType
}

const PostListItem: FC<ItemPropType> = ({
  isNoSidebar,
  isHideImage,
  isDetailPost,
  post,
}) => {
  const [openOptions, setOpenOptions] = useState(false)
  const innerRef = useOuterClick(() => setOpenOptions(false))
  const currentUser = useAppSelector(selectCurrentUser)

  if (!post) return null
  const classProfile = isNoSidebar ? 'col-lg-6' : null

  return (
    <div className={`ass1-section__item ${classProfile}`}>
      <div className='ass1-section'>
        <div className='ass1-section__head'>
          <Link href={`/users/${post.USERID}`}>
            <a className='ass1-section__avatar ass1-avatar'>
              <img
                src={post.profilepicture || '/images/avatar-02.png'}
                alt=''
                width={38}
                height={38}
              />
            </a>
          </Link>
          <div style={{ flexGrow: 1 }}>
            <Link href={`/users/${post.USERID}`}>
              <a
                className='ass1-section__name'
                dangerouslySetInnerHTML={{ __html: post.fullname }}
              />
            </Link>
            <span className='ass1-section__passed'>
              {dayjs(post.time_added).fromNow()}
            </span>
          </div>
          {post.USERID === currentUser?.USERID && (
            <div
              ref={innerRef as RefObject<HTMLDivElement>}
              className='wrapper-options'
            >
              <div
                className='wrap-icon'
                onClick={() => setOpenOptions((open) => !open)}
              >
                <i className='icon-Options'></i>
              </div>
              {openOptions && (
                <div className='options'>
                  <div className='option edit-option'>
                    <Link href={`/posts/${post.PID}/edit`}>
                      <a>Edit</a>
                    </Link>
                  </div>
                  <div className='option delete-option'>
                    <Link href={`/posts/${post.PID}/delete`}>
                      <a style={{ color: 'red' }}>Delete</a>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className='ass1-section__content'>
          <p dangerouslySetInnerHTML={{ __html: post.post_content }} />
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
  isNoSidebar: false,
  isHideImage: false,
  isDetailPost: false,
}

export default PostListItem
