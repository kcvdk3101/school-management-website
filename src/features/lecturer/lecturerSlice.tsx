import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import lecturersApi, { EditLecturerData } from '../../api/university/lecturersApi'
import { LecturerModel } from '../../models/lecturer.model'

interface LecturerState {
  fetchingLecturer: boolean
  savingFile: boolean
  lecturers: LecturerModel[]
  pagination: LecturerPagination
}

interface LecturerPagination {
  total: number
}

const initialState: LecturerState = {
  fetchingLecturer: false,
  savingFile: false,
  lecturers: [],
  pagination: { total: 0 },
}

export const saveLecturersExcelFile = createAsyncThunk(
  'lecturers/saveExcelFile',
  async (file: FormData) => {
    const savedFile = await lecturersApi.saveLecturersExcelFile(file)
    return savedFile
  }
)

export const getLecturers = createAsyncThunk('lecturers/getLecturers', async (offset: number) => {
  const lecturers = await lecturersApi.getAllLecturers(offset)
  return lecturers
})

export const getLecturersByFilter = createAsyncThunk(
  'lecturers/getLecturersByFilter',
  async ({ offset, status, fullName }: { offset: number; status: string; fullName: string }) => {
    const students = await lecturersApi.filterByCondition(offset, status, fullName)
    return students
  }
)

export const editInfoLecturer = createAsyncThunk(
  'lecturers/editInfoLecturer',
  async ({ id, data }: { id: string; data: EditLecturerData }) => {
    const response = await lecturersApi.editInfoLecturer(id, data)
    return response
  }
)

export const addNewLecturer = createAsyncThunk(
  'lecturers/addNewStudent',
  async (data: LecturerModel[]) => {
    const response = await lecturersApi.addNewLecturer(data)
    return response
  }
)

export const lecturerSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Save excel file
    builder.addCase(saveLecturersExcelFile.pending, (state, action) => {
      state.savingFile = false
    })
    builder.addCase(saveLecturersExcelFile.fulfilled, (state, action) => {
      state.savingFile = true
    })
    builder.addCase(saveLecturersExcelFile.rejected, (state, action) => {
      state.savingFile = false
    })

    // Get all lecturers
    builder.addCase(getLecturers.pending, (state, action) => {
      state.fetchingLecturer = true
      state.lecturers = []
    })
    builder.addCase(getLecturers.fulfilled, (state, action) => {
      state.fetchingLecturer = false
      state.lecturers = action.payload.data
      state.pagination.total = action.payload.pagination.total
    })
    builder.addCase(getLecturers.rejected, (state, action) => {
      state.fetchingLecturer = false
      state.lecturers = []
    })

    // Get lecturers by filter
    builder.addCase(getLecturersByFilter.pending, (state, action) => {
      state.fetchingLecturer = true
      state.lecturers = []
    })
    builder.addCase(getLecturersByFilter.fulfilled, (state, action) => {
      state.fetchingLecturer = false
      state.lecturers = action.payload.data
      state.pagination.total = action.payload.pagination.total
    })
    builder.addCase(getLecturersByFilter.rejected, (state, action) => {
      state.fetchingLecturer = false
      state.lecturers = []
    })

    // Add lecterur
    builder.addCase(addNewLecturer.pending, (state, action) => {
      state.fetchingLecturer = true
    })
    builder.addCase(addNewLecturer.fulfilled, (state, action) => {
      state.fetchingLecturer = false
      state.lecturers = [...state.lecturers, action.payload]
    })
    builder.addCase(addNewLecturer.rejected, (state, action) => {
      state.fetchingLecturer = false
    })

    // Edit students
    builder.addCase(editInfoLecturer.pending, (state, action) => {
      state.fetchingLecturer = true
    })
    builder.addCase(editInfoLecturer.fulfilled, (state, action) => {
      let currentLecturer = state.lecturers.findIndex(
        (lecturer) => lecturer.id === action.payload.id
      )
      state.fetchingLecturer = false
      state.lecturers[currentLecturer] = action.payload
    })
    builder.addCase(editInfoLecturer.rejected, (state, action) => {
      state.fetchingLecturer = false
    })
  },
})

export default lecturerSlice.reducer
