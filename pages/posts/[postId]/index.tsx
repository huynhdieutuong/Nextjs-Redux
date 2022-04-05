import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import React, { FC } from 'react'
import { PostDetailsContent } from '../../../components/Post'
import { YourPostsSidebar } from '../../../components/Sidebar'
import {
  PRE_RENDERED_POSTS,
  RE_GENERATION_SECONDS,
} from '../../../constants/pages'
import { CategoryType, PostType } from '../../../interfaces/post'
import { CurrentUserType } from '../../../interfaces/user'
import commentService from '../../../services/comment'
import postService from '../../../services/post'
import userService from '../../../services/user'

const PostDetails: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
  postCategories,
  comments,
}) => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-lg-8'>
          <PostDetailsContent
            post={post}
            postCategories={postCategories}
            comments={comments}
          />
        </div>
        <div className='col-lg-4'>
          <YourPostsSidebar />
        </div>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await postService.getPostIds(PRE_RENDERED_POSTS)

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postId = params?.postId as string

  const res = await postService.getPostDetailByPostId(postId)
  const post: PostType = res.data.data.post || null
  const postCategories: CategoryType[] =
    res.data.data.categories.map((cat: any) => ({
      text: cat.tag_value,
      id: cat.tag_index,
    })) || []

  const [resUser, resComment] = await Promise.all([
    userService.getUserById(Number(post.USERID)),
    commentService.getCommentsByPostId(post.PID),
  ])
  const comments = resComment.data.comments || []
  const user: CurrentUserType = resUser.data.user || null
  if (user) {
    post.fullname = user.fullname
    post.profilepicture = user.profilepicture
  }

  return {
    props: {
      post,
      postCategories,
      comments,
    },
    revalidate: RE_GENERATION_SECONDS,
  }
}

export default PostDetails
