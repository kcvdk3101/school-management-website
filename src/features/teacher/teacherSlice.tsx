import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import teachersApi, { EditTeacherData } from '../../api/university/teachersApi'
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

export const saveTeachersExcelFile = createAsyncThunk(
  'teachers/saveExcelFile',
  async (file: FormData) => {
    const savedFile = await teachersApi.saveTeachersExcelFile(file)
    return savedFile
  }
)

export const getAllTeachers = createAsyncThunk(
  'teachers/getAllTeachers',
  async (offset: number) => {
    const teachers = await teachersApi.getAllTeachers(offset)
    return teachers
  }
)

export const getTeachersByFilter = createAsyncThunk(
  'teachers/getTeachersByFilter',
  async ({
    offset,
    position,
    department,
    fullName,
  }: {
    offset: number
    position: string
    department: string
    fullName: string
  }) => {
    const teachers = await teachersApi.filterByCondition(offset, position, department, fullName)
    return teachers
  }
)

export const editInfoTeacher = createAsyncThunk(
  'teachers/editInfoTeacher',
  async ({ id, data }: { id: string; data: EditTeacherData }) => {
    const response = await teachersApi.editInfoTeacher(id, data)
    return response
  }
)

export const addNewTeacher = createAsyncThunk(
  'teachers/addNewTeacher',
  async (data: TeacherModel[]) => {
    const response = await teachersApi.addNewTeacher(data)
    return response
  }
)

export const lecturerSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Save excel file
    builder.addCase(saveTeachersExcelFile.pending, (state, action) => {
      state.savingFile = false
    })
    builder.addCase(saveTeachersExcelFile.fulfilled, (state, action) => {
      state.savingFile = true
    })
    builder.addCase(saveTeachersExcelFile.rejected, (state, action) => {
      state.savingFile = false
    })

    // Get all lecturers
    builder.addCase(getAllTeachers.pending, (state, action) => {
      state.fetchingTeacher = true
      state.teachers = []
    })
    builder.addCase(getAllTeachers.fulfilled, (state, action) => {
      state.fetchingTeacher = false
      state.teachers = action.payload.data
      state.pagination.total = action.payload.pagination.total
    })
    builder.addCase(getAllTeachers.rejected, (state, action) => {
      state.fetchingTeacher = false
      state.teachers = []
    })

    // Get lecturers by filter
    builder.addCase(getTeachersByFilter.pending, (state, action) => {
      state.fetchingTeacher = true
      state.teachers = []
    })
    builder.addCase(getTeachersByFilter.fulfilled, (state, action) => {
      state.fetchingTeacher = false
      state.teachers = action.payload.data
      state.pagination.total = action.payload.pagination.total
    })
    builder.addCase(getTeachersByFilter.rejected, (state, action) => {
      state.fetchingTeacher = false
      state.teachers = []
    })

    // Add lecterur
    builder.addCase(addNewTeacher.pending, (state, action) => {
      state.fetchingTeacher = true
    })
    builder.addCase(addNewTeacher.fulfilled, (state, action) => {
      state.fetchingTeacher = false
      state.teachers = [...state.teachers, action.payload]
    })
    builder.addCase(addNewTeacher.rejected, (state, action) => {
      state.fetchingTeacher = false
    })

    // Edit students
    builder.addCase(editInfoTeacher.pending, (state, action) => {
      state.fetchingTeacher = true
    })
    builder.addCase(editInfoTeacher.fulfilled, (state, action) => {
      let currentLecturer = state.teachers.findIndex(
        (lecturer) => lecturer.id === action.payload.id
      )
      state.fetchingTeacher = false
      state.teachers[currentLecturer] = action.payload
    })
    builder.addCase(editInfoTeacher.rejected, (state, action) => {
      state.fetchingTeacher = false
    })
  },
})

export default lecturerSlice.reducer
