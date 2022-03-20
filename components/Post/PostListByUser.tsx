import Link from 'next/link'
import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getUserPostList } from '../../redux/post/postActions'
import {
  selectLoadingUserPostList,
  selectUserPostList,
} from '../../redux/post/postReducers'
import { selectCurrentUser } from '../../redux/user/userReducers'
import { Spinner } from '../Spinner'
import PostListItem from './PostListItem'

const PostListByUser: FC = () => {
  const dispatch = useAppDispatch()
  const userPostList = useAppSelector(selectUserPostList)
  const loadingUserPostList = useAppSelector(selectLoadingUserPostList)
  const currentUser = useAppSelector(selectCurrentUser)

  useEffect(() => {
    dispatch(getUserPostList(currentUser?.USERID || ''))
  }, [])

  if (loadingUserPostList) return <Spinner />

  if (!userPostList.length)
    return (
      <p>
        You have no posts.{' '}
        <Link href='/posts/create'>
          <a>Click here</a>
        </Link>{' '}
        to create your posts
      </p>
    )

  return (
    <>
      {userPostList.map((post) => (
        <PostListItem isHideImage key={post.PID} post={post} />
      ))}
    </>
  )
}

export default PostListByUser
