import { ParamsGetPostListType } from '../interfaces/post'
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
}

export default postService
