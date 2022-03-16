import { NextPage } from 'next'
import React from 'react'
import { PostDetailForm } from '../../components/Post'
import { CreatePostSidebar } from '../../components/Sidebar'
import { useAuthen } from '../../helpers/useAuthen'

const CreatePost: NextPage = () => {
  useAuthen()
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-8'>
          <PostDetailForm />
        </div>
        <div className='col-lg-4'>
          <CreatePostSidebar />
        </div>
      </div>
    </div>
  )
}

export default CreatePost
