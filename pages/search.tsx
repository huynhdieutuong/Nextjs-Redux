import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import React, { FC } from 'react'
import PostListNoSidebar from '../components/Post/PostListNoSidebar'
import { hightlightText } from '../helpers/utils'
import { PostType } from '../interfaces/post'
import postService from '../services/post'

const Search: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  searchPostList,
  searchText,
}) => {
  const postList = searchPostList.map((post: PostType) => {
    const formatedPost = { ...post }
    formatedPost.fullname = hightlightText(formatedPost.fullname, searchText)
    formatedPost.post_content = hightlightText(
      formatedPost.post_content,
      searchText
    )
    return formatedPost
  })
  return <PostListNoSidebar postList={postList} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const searchText = query.text as string
  const res = await postService.getPostsByQuery(searchText)

  const searchPostList: PostType[] = res.data.posts || []

  return {
    props: { searchPostList, searchText },
  }
}

export default Search
