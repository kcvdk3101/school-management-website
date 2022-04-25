import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import jobApi from '../../api/jobApi'
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
    const response = await jobApi.getJobsByCondition(limit, offset)
    return response
  }
)

export const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get jobs by condition
    builder.addCase(getJobs.pending, (state, action) => {
      state.fetchingJob = true
    })
    builder.addCase(getJobs.fulfilled, (state, action) => {
      state.fetchingJob = false
      state.jobs = action.payload.data.data
      state.pagination.total = action.payload.data.pagination.total
    })
    builder.addCase(getJobs.rejected, (state, action) => {
      state.fetchingJob = false
      state.jobs = []
      state.pagination.total = 0
    })
  },
})

export const {} = jobSlice.actions
export default jobSlice.reducer
