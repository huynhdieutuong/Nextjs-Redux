import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import React, { FC } from 'react'
import { PostDetailsContent } from '../../components/Post'
import { YourPostsSidebar } from '../../components/Sidebar'
import postService from '../../services/post'

const PostDetails: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-8'>
          <PostDetailsContent post={post} />
        </div>
        <div className='col-lg-4'>
          <YourPostsSidebar />
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await postService.getPostIds(
    Number(process.env.PRE_RENDERED_POSTS)
  )

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postId = params?.postId as string
  const res = await postService.getPostDetailByPostId(postId)

  return {
    props: {
      post: res.data.data.post || null,
    },
    revalidate: Number(process.env.RE_GENERATION_SECONDS),
  }
}

export default PostDetails
