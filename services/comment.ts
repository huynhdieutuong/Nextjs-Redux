import { AddCommentType } from '../interfaces/comment'
import axiosClient from './axiosClient'

const url = '/comment'

const commentService = {
  getCommentsByPostId: (postid: string) => {
    return axiosClient.get(`${url}/comments.php?postid=${postid}`)
  },
  addCommentByPostId: (data: AddCommentType) => {
    return axiosClient.post(`${url}/add_new.php`, data)
  },
}

export default commentService
