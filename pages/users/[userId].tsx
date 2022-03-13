import React from 'react'
import { UserDetails, UserPosts } from '../../components/User'

const Profile = () => {
  return (
    <div className='container'>
      <UserDetails />
      <UserPosts />
    </div>
  )
}

export default Profile
