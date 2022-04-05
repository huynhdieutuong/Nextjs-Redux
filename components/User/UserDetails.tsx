import Link from 'next/link'
import React, { FC } from 'react'
import { PostType } from '../../interfaces/post'
import { CurrentUserType } from '../../interfaces/user'
import { useAppSelector } from '../../redux/hooks'
import { selectCurrentUser } from '../../redux/user/userReducers'

interface UserDetailsType {
  user: CurrentUserType | null
  postList: PostType[]
}

const UserDetails: FC<UserDetailsType> = ({ user, postList }) => {
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <div className='ass1-head-user'>
      <div className='ass1-head-user__content'>
        <div className='ass1-head-user__image'>
          <a href='#'>
            <img src={user?.profilepicture} alt='' />
          </a>
        </div>
        <div className='ass1-head-user__info'>
          <div className='ass1-head-user__info-head'>
            <div className='ass1-head-user__name'>
              <span>{user?.fullname}</span>
              <i>
                <img src='/fonts/emotion/svg/Verified.svg' alt='' />
              </i>
            </div>
            <div className='w-100' />
            {currentUser?.USERID !== user?.USERID ? (
              <a href='#' className='ass1-head-user__btn-follow ass1-btn'>
                Follow
              </a>
            ) : (
              <>
                <Link href='/users/change-password'>
                  <a className='ass1-head-user__btn-follow ass1-btn'>
                    Change password
                  </a>
                </Link>
                <Link href='/users/update-profile'>
                  <a className='ass1-head-user__btn-follow ass1-btn'>
                    Update profile
                  </a>
                </Link>
              </>
            )}
            {/* <a href="#" class="ass1-head-user__btn-options ass1-btn-icon"><i class="icon-Options"></i></a> */}
          </div>
          <div className='ass1-head-user__info-statistic'>
            <div className='ass1-btn-icon'>
              <i className='icon-Post' />
              <span>Posts: {postList.length}</span>
            </div>
            {/* <div className='ass1-btn-icon'>
              <i className='icon-Followers' />
              <span>Followers: 99999</span>
            </div>
            <div className='ass1-btn-icon'>
              <i className='icon-Following' />
              <span>Following: 999</span>
            </div> */}
            {/* <div class="ass1-btn-icon"><i class="icon-Upvote"></i><span>Up Vote: 999999</span></div> */}
          </div>
          <p>{user?.description}</p>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
