import { useRouter } from 'next/router'
import React from 'react'
import useSWR, { Fetcher } from 'swr'
import PostListNoSidebar from '../../components/Post/PostListNoSidebar'
import { UserDetails } from '../../components/User'
import { PostType } from '../../interfaces/post'
import { CurrentUserType } from '../../interfaces/user'
import postService from '../../services/post'
import userService from '../../services/user'

interface FetcherType {
  user: CurrentUserType
  posts: PostType[]
}

const Profile = () => {
  const router = useRouter()

  const userId = router.query.userId as string
  const fetcher: Fetcher<FetcherType> = async (userId: string) => {
    const userPros = userService.getUserById(parseInt(userId))
    const postsPros = postService.getPostListByUserId(userId)
    const [resUser, resPosts] = await Promise.all([userPros, postsPros])
    return {
      user: resUser.data.user,
      posts: resPosts.data.posts,
    }
  }

  const { data } = useSWR(userId, fetcher)
  const user = data?.user || null
  const posts = data?.posts || []

  return (
    <div className='container'>
      <UserDetails user={user} postList={posts} />
      <PostListNoSidebar postList={posts} />
    </div>
  )
}

export default Profile
