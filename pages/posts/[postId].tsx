import { NextPage } from 'next'
import React from 'react'
import { PostDetailsContent } from '../../components/Post'
import { YourPostsSidebar } from '../../components/Sidebar'

const PostDetails: NextPage = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-8'>
          <PostDetailsContent />
        </div>
        <div className='col-lg-4'>
          <YourPostsSidebar />
        </div>
      </div>
    </div>
  )
}

export default PostDetails
