import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import postApi from '../../api/university/postApi'
import { PostModel } from '../../models/post.model'

interface PostState {
  fetchingPost: boolean
  posts: PostModel[]
  pagination: PostPagination
}

interface PostPagination {
  total: number
}

const initialState: PostState = {
  fetchingPost: false,
  posts: [],
  pagination: { total: 0 },
}

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
  let adminId = localStorage.getItem('id') as string
  const response = await postApi.getAllPost(adminId)
  return response
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (post: PostModel[]) => {
  let adminId = localStorage.getItem('id') as string
  const response = await postApi.addNewPost(adminId, post)
  return response
})

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get all post
    builder.addCase(getAllPosts.pending, (state, action) => {
      state.fetchingPost = true
      state.posts = []
    })
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.fetchingPost = false
      state.posts = action.payload.data
      state.pagination.total = action.payload.pagination.total
    })
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.fetchingPost = false
      state.posts = []
    })

    // Add post
    builder.addCase(addNewPost.pending, (state, action) => {
      state.fetchingPost = true
    })
    builder.addCase(addNewPost.fulfilled, (state, action) => {
      state.fetchingPost = false
      state.posts = [...state.posts, action.payload[0]]
    })
    builder.addCase(addNewPost.rejected, (state, action) => {
      state.fetchingPost = false
    })

    // Edit post
    // builder.addCase(editInfoStudent.pending, (state, action) => {
    //   state.fetchingStudent = true
    // })
    // builder.addCase(editInfoStudent.fulfilled, (state, action) => {
    //   let currentStudent = state.students.findIndex((student) => student.id === action.payload.id)
    //   state.fetchingStudent = false
    //   state.students[currentStudent] = action.payload
    // })
    // builder.addCase(editInfoStudent.rejected, (state, action) => {
    //   state.fetchingStudent = false
    // })
  },
})

export default postSlice.reducer
