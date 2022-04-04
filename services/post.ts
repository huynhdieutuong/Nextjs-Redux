import { isEmptyObject } from '../helpers/utils'
import {
  CategoryType,
  CreatePostType,
  ParamsGetPostListByCatIdType,
  ParamsGetPostListType,
  PostType,
} from '../interfaces/post'
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
  getCategories: () => {
    return axiosClient.get('/categories/index.php')
  },
  getCatIds: async () => {
    const res = await postService.getCategories()
    return res.data.categories.map((category: CategoryType) => ({
      params: { catId: `${category.id}` },
    }))
  },
  getPostsByCatId: (params: ParamsGetPostListByCatIdType) => {
    return axiosClient.get(
      `${url}/getListByCategory.php?pagesize=${params.pagesize}&currPage=${params.currPage}&tagIndex=${params.catId}`
    )
  },
  getPostsByQuery: (searchText: string) => {
    return axiosClient.get(`${url}/search.php?query=${encodeURI(searchText)}`)
  },
  createPost: (data: CreatePostType) => {
    const post = new FormData()
    post.append('post_content', data.post_content)
    post.append('category', data.category)

    if (!isEmptyObject(data.obj_image.file))
      post.append('obj_image', data.obj_image.file)
    if (data.url_image) post.append('url_image', data.url_image)

    return axiosClient.post(`${url}/addNew.php`, post)
  },
  updatePost: (data: CreatePostType) => {
    const post = new FormData()
    post.append('postid', data.postid as string)
    post.append('post_content', data.post_content)
    post.append('category', data.category)

    if (!isEmptyObject(data.obj_image.file))
      post.append('obj_image', data.obj_image.file)
    if (data.url_image) post.append('url_image', data.url_image)

    return axiosClient.post(`${url}/edit.php`, post)
  },
}

export default postService
