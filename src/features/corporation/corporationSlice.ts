import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import corporationApi from '../../api/corporation/corporationApi'
import { CorporationModel } from '../../models/corporation.model'

export interface CorporationsSliceState {
  fetchCorporations: boolean
  pagination: CorporationPagination
  corporations: CorporationModel[]
}

export interface CorporationPagination {
  total: number
}

const initialState: CorporationsSliceState = {
  fetchCorporations: false,
  pagination: { total: 0 },
  corporations: [],
}

export const getCorporations = createAsyncThunk(
  'corporation/getCorporations',
  async ({ limit, offset }: { limit: number; offset: number }) => {
    const corporations = await corporationApi.getAllCorporations(limit, offset)
    return corporations
  }
)

export const activateCorporation = createAsyncThunk(
  'corporation/activateCorporation',
  async (corpId: string) => {
    const activatedCorporation = await corporationApi.activateCorporation(corpId)
    return activatedCorporation
  }
)

const corporationSlice = createSlice({
  name: 'corporation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get corporation by limit and offset
    builder.addCase(getCorporations.pending, (state, action) => {
      state.fetchCorporations = true
      state.corporations = []
      state.pagination.total = 0
    })
    builder.addCase(getCorporations.fulfilled, (state, action) => {
      state.fetchCorporations = false
      state.corporations = action.payload.data
      state.pagination.total = action.payload.pagination.total
    })
    builder.addCase(getCorporations.rejected, (state, action) => {
      state.fetchCorporations = false
      state.corporations = []
      state.pagination.total = 0
    })

    // Activate current coproration
    builder.addCase(activateCorporation.pending, (state, action) => {
      state.fetchCorporations = true
    })
    builder.addCase(activateCorporation.fulfilled, (state, action) => {
      let findIndexCorp = state.corporations.findIndex((corp) => corp.id === action.payload.id)
      state.fetchCorporations = false
      state.corporations[findIndexCorp].isActive = action.payload.isActive
    })
    builder.addCase(activateCorporation.rejected, (state, action) => {
      state.fetchCorporations = false
    })
  },
})

export default corporationSlice.reducer
