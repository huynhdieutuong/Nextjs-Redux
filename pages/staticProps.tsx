import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { YourPostsSidebar } from '../components/Sidebar'
import { PostList } from '../components/Post'
import { FC, useMemo, useState } from 'react'
import postService from '../services/post'
import { PostType } from '../interfaces/post'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { selectLoadingButton, selectPostList } from '../redux/post/postReducers'
import { getPostList, setPostList } from '../redux/post/postActions'
import { wrapper } from '../redux/store'

const pagesize = 3

const Home: FC<InferGetStaticPropsType<typeof getStaticProps>> = () => {
  const dispatch = useAppDispatch()
  const loadingButton = useAppSelector(selectLoadingButton)
  const postList = useAppSelector(selectPostList)
  const [page, setPage] = useState(2)

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

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) => async () => {
    const res = await postService.getPostList()
    const postList: PostType[] = res.data.posts || []
    store.dispatch(setPostList(postList))
    return {
      props: {},
    }
  }
)

export default Home
