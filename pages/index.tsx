import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { YourPostsSidebar } from '../components/Sidebar'
import { PostList } from '../components/Post'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-8'>
          <PostList />
        </div>
        <div className='col-lg-4'>
          <YourPostsSidebar />
        </div>
      </div>
    </div>
  )
}

export default Home
