import { createAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { CategoryType, PostType } from '../../interfaces/post'
import { RootState } from '../store'
import {
  getCategories,
  getPostList,
  getPostListByCatId,
  getUserPostList,
} from './postActions'

interface StateType {
  loadingButton: boolean
  loadingUserPostList: boolean
  postList: PostType[]
  userPostList: PostType[]
  catPostList: PostType[]
  categories: CategoryType[]
}

const initialState: StateType = {
  loadingButton: false,
  loadingUserPostList: true,
  postList: [],
  userPostList: [],
  catPostList: [],
  categories: [],
}

const hydrate = createAction<RootState>(HYDRATE)

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostList: (state, action) => {
      state.postList = action.payload
    },
    setCategories: (state, action) => {
      state.categories = action.payload
    },
    setPostListByCatId: (state, action) => {
      state.catPostList = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      if (action.payload.post.categories.length) {
        state.categories = action.payload.post.categories
      }
      state.postList = action.payload.post.postList
      state.catPostList = action.payload.post.catPostList
    }),
      builder.addCase(getPostList.pending, (state) => {
        state.loadingButton = true
      }),
      builder.addCase(getPostList.fulfilled, (state, action) => {
        state.postList = [...state.postList, ...action.payload]
        state.loadingButton = false
      }),
      builder.addCase(getPostList.rejected, (state) => {
        state.postList = []
        state.loadingButton = false
      }),
      builder.addCase(getUserPostList.fulfilled, (state, action) => {
        state.userPostList = action.payload
        state.loadingUserPostList = false
      }),
      builder.addCase(getUserPostList.rejected, (state) => {
        state.userPostList = []
        state.loadingUserPostList = false
      }),
      builder.addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      }),
      builder.addCase(getPostListByCatId.pending, (state) => {
        state.loadingButton = true
      }),
      builder.addCase(getPostListByCatId.fulfilled, (state, action) => {
        state.catPostList = [...state.catPostList, ...action.payload]
        state.loadingButton = false
      }),
      builder.addCase(getPostListByCatId.rejected, (state) => {
        state.catPostList = []
        state.loadingButton = false
      })
  },
})

export const selectPostList = (state: RootState) => state.post.postList
export const selectLoadingButton = (state: RootState) =>
  state.post.loadingButton
export const selectUserPostList = (state: RootState) => state.post.userPostList
export const selectLoadingUserPostList = (state: RootState) =>
  state.post.loadingUserPostList
export const selectCategories = (state: RootState) => state.post.categories
export const selectCatPostList = (state: RootState) => state.post.catPostList

export default postSlice.reducer
