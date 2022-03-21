import { ParamsGetPostListType, PostType } from '../interfaces/post'
import axiosClient from './axiosClient'

const url = '/post'

const postService = {
  getPostList: (
    params: ParamsGetPostListType = { pagesize: 3, currPage: 1 }
  ) => {
    return axiosClient.get(
      `${url}/getListPagination.php?pagesize=${params.pagesize}&currPage=${params.currPage}`
    )
  },
  getPostListByUserId: (userId: string) => {
    return axiosClient.get(`${url}/getListPostUserID.php?userid=${userId}`)
  },
  getPostDetailByPostId: (postId: string) => {
    return axiosClient.get(`${url}/post.php?postid=${postId}`)
  },
  getPostIds: async (limit: number) => {
    const res = await postService.getPostList({ pagesize: limit, currPage: 1 })
    return res.data.posts.map((post: PostType) => ({
      params: { postId: `${post.PID}` },
    }))
  },
}

export default postService
