import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import lecturersApi, { EditTeacherData } from '../../api/university/teachersApi'
import { TeacherModel } from '../../models/teacher.model'

interface TeacherState {
  fetchingTeacher: boolean
  savingFile: boolean
  teachers: TeacherModel[]
  pagination: TeacherPagination
}

interface TeacherPagination {
  total: number
}

const initialState: TeacherState = {
  fetchingTeacher: false,
  savingFile: false,
  teachers: [],
  pagination: { total: 0 },
}

export const saveLecturersExcelFile = createAsyncThunk(
  'teachers/saveExcelFile',
  async (file: FormData) => {
    const savedFile = await lecturersApi.saveLecturersExcelFile(file)
    return savedFile
  }
)

export const getLecturers = createAsyncThunk('teachers/getLecturers', async (offset: number) => {
  const teachers = await lecturersApi.getAllLecturers(offset)
  console.log('khoi nguuu', teachers)
  return teachers
})

export const getLecturersByFilter = createAsyncThunk(
  'teachers/getLecturersByFilter',
  async ({ offset, status, fullName }: { offset: number; status: string; fullName: string }) => {
    const teachers = await lecturersApi.filterByCondition(offset, status, fullName)
    console.log(teachers)
    return teachers
  }
)

export const editInfoLecturer = createAsyncThunk(
  'teachers/editInfoLecturer',
  async ({ id, data }: { id: string; data: EditTeacherData }) => {
    const response = await lecturersApi.editInfoLecturer(id, data)
    return response
  }
)

export const addNewLecturer = createAsyncThunk(
  'teachers/addNewLecturer',
  async (data: TeacherModel[]) => {
    const response = await lecturersApi.addNewLecturer(data)
    return response
  }
)

export const lecturerSlice = createSlice({
  name: 'teachers',
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
      state.fetchingTeacher = true
      state.teachers = []
    })
    builder.addCase(getLecturers.fulfilled, (state, action) => {
      state.fetchingTeacher = false
      state.teachers = action.payload.data
      state.pagination.total = action.payload.pagination.total
    })
    builder.addCase(getLecturers.rejected, (state, action) => {
      state.fetchingTeacher = false
      state.teachers = []
    })

    // Get lecturers by filter
    builder.addCase(getLecturersByFilter.pending, (state, action) => {
      state.fetchingTeacher = true
      state.teachers = []
    })
    builder.addCase(getLecturersByFilter.fulfilled, (state, action) => {
      state.fetchingTeacher = false
      state.teachers = action.payload.data
      state.pagination.total = action.payload.pagination.total
    })
    builder.addCase(getLecturersByFilter.rejected, (state, action) => {
      state.fetchingTeacher = false
      state.teachers = []
    })

    // Add lecterur
    builder.addCase(addNewLecturer.pending, (state, action) => {
      state.fetchingTeacher = true
    })
    builder.addCase(addNewLecturer.fulfilled, (state, action) => {
      state.fetchingTeacher = false
      state.teachers = [...state.teachers, action.payload]
    })
    builder.addCase(addNewLecturer.rejected, (state, action) => {
      state.fetchingTeacher = false
    })

    // Edit students
    builder.addCase(editInfoLecturer.pending, (state, action) => {
      state.fetchingTeacher = true
    })
    builder.addCase(editInfoLecturer.fulfilled, (state, action) => {
      let currentLecturer = state.teachers.findIndex(
        (lecturer) => lecturer.id === action.payload.id
      )
      state.fetchingTeacher = false
      state.teachers[currentLecturer] = action.payload
    })
    builder.addCase(editInfoLecturer.rejected, (state, action) => {
      state.fetchingTeacher = false
    })
  },
})

export default lecturerSlice.reducer
