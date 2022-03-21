import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import React, { FC, useState } from 'react'
import { PostListItem } from '../../components/Post'
import PostListNoSidebar from '../../components/Post/PostListNoSidebar'
import { PostType } from '../../interfaces/post'
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
  catId,
}) => {
  const dispatch = useAppDispatch()
  const loadingButton = useAppSelector(selectLoadingButton)
  const catPostList = useAppSelector(selectCatPostList)
  const [page, setPage] = useState(2)

  const handleLoadMore = () => {
    dispatch(getPostListByCatId({ pagesize, currPage: page, catId }))
    setPage(page + 1)
  }

  return (
    <PostListNoSidebar
      postList={catPostList}
      handleLoadMore={handleLoadMore}
      isLoading={loadingButton}
    />
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
      const res = await postService.getPostsByCatId({
        pagesize,
        currPage: 1,
        catId,
      })

      const postList: PostType[] = res.data.posts || []

      store.dispatch(setPostListByCatId(postList))

      return {
        props: {
          catId,
        },
        revalidate: Number(process.env.RE_GENERATION_SECONDS),
      }
    }
)

export default CategoryDetail
