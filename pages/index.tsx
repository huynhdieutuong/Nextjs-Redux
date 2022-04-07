import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { YourPostsSidebar } from '../components/Sidebar'
import { PostList } from '../components/Post'
import { FC, useMemo, useState } from 'react'
import postService from '../services/post'
import { CategoryType, PostType } from '../interfaces/post'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { selectLoadingButton, selectPostList } from '../redux/post/postReducers'
import {
  getPostList,
  setCategories,
  setPostList,
} from '../redux/post/postActions'
import { wrapper } from '../redux/store'
import { RE_GENERATION_SECONDS } from '../constants/pages'
import { NextSeo } from 'next-seo'

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
      <NextSeo
        title='Funny photo social network - Meme'
        description='This is a photo social network'
        openGraph={{
          title: 'Demo - Funny photo social network - Meme',
          description: 'Demo - This is a photo social network',
          images: [
            {
              url: '/images/cat-1634369_1920.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            },
            {
              url: '/images/cat-1652822_1920.jpg',
              width: 900,
              height: 800,
              alt: 'Og Image Alt Second',
              type: 'image/jpeg',
            },
            { url: '/images/cat-1634369_1920.jpg' },
            { url: '/images/cat-1652822_1920.jpg' },
          ],
          site_name: 'This is site name',
        }}
      />
      <h1 style={{ display: 'none' }}>Funny photo social network - Meme</h1>
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
    const [resPostList, resCategories] = await Promise.all([
      postService.getPostList(),
      postService.getCategories(),
    ])

    const postList: PostType[] = resPostList.data.posts || []
    const categories: CategoryType[] = resCategories.data.categories || []

    store.dispatch(setPostList(postList))
    store.dispatch(setCategories(categories))

    return {
      props: {},
      revalidate: RE_GENERATION_SECONDS,
    }
  }
)

export default Home
