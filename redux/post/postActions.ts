import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import {
  CategoryType,
  ParamsGetPostListByCatIdType,
  ParamsGetPostListType,
  PostType,
} from '../../interfaces/post'
import postService from '../../services/post'

export const setPostList = createAction<PostType[]>('post/setPostList')
export const getPostList = createAsyncThunk(
  'post/getPostList',
  async (params?: ParamsGetPostListType) => {
    const res = await postService.getPostList(params)
    return res.data.posts
  }
)

export const getUserPostList = createAsyncThunk(
  'post/getUserPostList',
  async (userId: string) => {
    const res = await postService.getPostListByUserId(userId)
    return res.data.posts.slice(0, 5)
  }
)

export const setCategories = createAction<CategoryType[]>('post/setCategories')
export const getCategories = createAsyncThunk(
  'post/getCategories',
  async () => {
    const res = await postService.getCategories()
    return res.data.categories || []
  }
)

export const setPostListByCatId = createAction<PostType[]>(
  'post/setPostListByCatId'
)
export const getPostListByCatId = createAsyncThunk(
  'post/getPostListByCatId',
  async (params: ParamsGetPostListByCatIdType) => {
    const res = await postService.getPostsByCatId(params)
    return res.data.posts
  }
)
