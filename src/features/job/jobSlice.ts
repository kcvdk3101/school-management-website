import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import jobApi from '../../api/corporation/jobApi'
import { JobModel } from '../../models'

interface JobState {
  fetchingJob: boolean
  jobs: JobModel[]
  pagination: JobPagination
}

interface JobPagination {
  total: number
}

const initialState: JobState = {
  fetchingJob: false,
  jobs: [],
  pagination: { total: 0 },
}

export const getJobs = createAsyncThunk(
  'jobs/getJobs',
  async ({ limit, offset }: { limit: number; offset: number }) => {
    const response = await jobApi.getJobs(limit, offset)
    return response
  }
)

export const getJobsByTitle = createAsyncThunk(
  'jobs/getJobsByTitle',
  async ({ limit, offset, title }: { limit: number; offset: number; title: string }) => {
    const response = await jobApi.getJobsByTitle(limit, offset, title)
    return response
  }
)

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get Jobs
    builder.addCase(getJobs.pending, (state, action) => {
      state.fetchingJob = true
    })
    builder.addCase(getJobs.fulfilled, (state, action) => {
      state.fetchingJob = false
      state.jobs = action.payload.data
      state.pagination.total = action.payload.pagination.total
    })
    builder.addCase(getJobs.rejected, (state, action) => {
      state.fetchingJob = false
      state.jobs = []
      state.pagination.total = 0
    })

    // Get Jobs By Title
    builder.addCase(getJobsByTitle.pending, (state, action) => {
      state.fetchingJob = true
    })
    builder.addCase(getJobsByTitle.fulfilled, (state, action) => {
      state.fetchingJob = false
      state.jobs = action.payload.data
      state.pagination.total = action.payload.pagination.total
    })
    builder.addCase(getJobsByTitle.rejected, (state, action) => {
      state.fetchingJob = false
      state.jobs = []
      state.pagination.total = 0
    })
  },
})

export default jobSlice.reducer
