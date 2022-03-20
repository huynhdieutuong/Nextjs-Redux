import { createAction, createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { PostType } from '../../interfaces/post'
import { RootState } from '../store'
import { getPostList } from './postActions'

interface StateType {
  loadingButton: boolean
  postList: PostType[]
}

const initialState: StateType = {
  loadingButton: false,
  postList: [],
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
      builder.addCase(hydrate, (state, action) => {
        state.postList = action.payload.post.postList
      })
  },
})

export const selectPostList = (state: RootState) => state.post.postList
export const selectLoadingButton = (state: RootState) =>
  state.post.loadingButton

export default postSlice.reducer
