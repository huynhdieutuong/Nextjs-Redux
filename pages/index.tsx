import type { NextPage } from 'next'
import { YourPostsSidebar } from '../components/Sidebar'
import { PostList } from '../components/Post'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { selectLoadingButton, selectPostList } from '../redux/post/postReducers'
import { getPostList } from '../redux/post/postActions'
import { useEffect, useState } from 'react'

const pagesize = 3

const Home: NextPage = () => {
  const dispatch = useAppDispatch()
  const postList = useAppSelector(selectPostList)
  const loadingButton = useAppSelector(selectLoadingButton)
  const [page, setPage] = useState(2)

  useEffect(() => {
    dispatch(getPostList())
  }, [dispatch])

  const handleLoadMore = () => {
    dispatch(getPostList({ pagesize, currPage: page }))
    setPage(page + 1)
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-8'>
          <PostList
            postList={postList}
            handleLoadMore={handleLoadMore}
            isLoading={loadingButton}
          />
        </div>
        <div className='col-lg-4'>
          <YourPostsSidebar />
        </div>
      </div>
    </div>
  )
}

export default Home
