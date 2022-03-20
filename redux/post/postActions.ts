import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { ParamsGetPostListType, PostType } from '../../interfaces/post'
import postService from '../../services/post'

export const getPostList = createAsyncThunk(
  'post/getPostList',
  async (params?: ParamsGetPostListType) => {
    const res = await postService.getPostList(params)
    return res.data.posts
  }
)

export const setPostList = createAction<PostType[]>('post/setPostList')
