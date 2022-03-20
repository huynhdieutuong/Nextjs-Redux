import { createAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { PostType } from '../../interfaces/post'
import { RootState } from '../store'
import { getPostList, getUserPostList } from './postActions'

interface StateType {
  loadingButton: boolean
  loadingUserPostList: boolean
  postList: PostType[]
  userPostList: PostType[]
}

const initialState: StateType = {
  loadingButton: false,
  loadingUserPostList: true,
  postList: [],
  userPostList: [],
}

const hydrate = createAction<RootState>(HYDRATE)

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPostList: (state, action) => {
      state.postList = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      state.postList = action.payload.post.postList
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
      })
  },
})

export const selectPostList = (state: RootState) => state.post.postList
export const selectLoadingButton = (state: RootState) =>
  state.post.loadingButton
export const selectUserPostList = (state: RootState) => state.post.userPostList
export const selectLoadingUserPostList = (state: RootState) =>
  state.post.loadingUserPostList

export default postSlice.reducer
