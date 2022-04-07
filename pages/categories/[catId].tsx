import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { NextSeo } from 'next-seo'
import React, { FC, useState } from 'react'
import PostListNoSidebar from '../../components/Post/PostListNoSidebar'
import { RE_GENERATION_SECONDS } from '../../constants/pages'
import { CategoryType, PostType } from '../../interfaces/post'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  getPostListByCatId,
  setPostListByCatId,
} from '../../redux/post/postActions'
import {
  selectCatPostList,
  selectLoadingButton,
} from '../../redux/post/postReducers'
import { wrapper } from '../../redux/store'
import postService from '../../services/post'

const pagesize = 3

const CategoryDetail: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  category,
}) => {
  const dispatch = useAppDispatch()
  const loadingButton = useAppSelector(selectLoadingButton)
  const catPostList = useAppSelector(selectCatPostList)
  const [page, setPage] = useState(2)

  const handleLoadMore = () => {
    dispatch(
      getPostListByCatId({ pagesize, currPage: page, catId: category?.id })
    )
    setPage(page + 1)
  }

  if (!category) return <p>Category not found</p>

  return (
    <>
      <NextSeo
        title={`${category?.text} category`}
        description={`This is a description of ${category?.text} category`}
        openGraph={{
          title: `Demo - ${category?.text} category`,
          description: `Demo - This is a description of ${category?.text} category`,
          images: [{ url: '/images/food-1631727_1920.jpg' }],
          site_name: 'This is site name',
        }}
      />
      <h1 style={{ display: 'none' }}>{category?.text}</h1>
      <PostListNoSidebar
        postList={catPostList}
        handleLoadMore={handleLoadMore}
        isLoading={loadingButton}
      />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await postService.getCatIds()

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ params }) => {
      const catId = Number(params?.catId)
      const proPosts = postService.getPostsByCatId({
        pagesize,
        currPage: 1,
        catId,
      })
      const proCat = postService.getCategory(catId)

      const [resPosts, resCat] = await Promise.all([proPosts, proCat])

      const postList: PostType[] = resPosts.data.posts || []
      const category: CategoryType = resCat || null

      store.dispatch(setPostListByCatId(postList))

      return {
        props: {
          category,
        },
        revalidate: RE_GENERATION_SECONDS,
      }
    }
)

export default CategoryDetail
