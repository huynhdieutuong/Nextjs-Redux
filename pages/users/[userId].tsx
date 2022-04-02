import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import PostListNoSidebar from '../../components/Post/PostListNoSidebar'
import { UserDetails } from '../../components/User'
import postService from '../../services/post'
import userService from '../../services/user'

const Profile = () => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const userId = router.query.userId as string
      const userPros = userService.getUserById(parseInt(userId))
      const postsPros = postService.getPostListByUserId(userId)
      const [resUser, resPosts] = await Promise.all([userPros, postsPros])

      setUser(resUser.data.user)
      setPosts(resPosts.data.posts || [])
    }

    fetchData()
  }, [router.query.userId])

  return (
    <div className='container'>
      <UserDetails user={user} />
      <PostListNoSidebar postList={posts} />
    </div>
  )
}

export default Profile
