import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import studentsApi, { EditStudentData } from '../../api/university/studentsApi'
import { StudentModel } from '../../models/student.model'

interface StudentState {
  fetchingStudent: boolean
  students: StudentModel[]
  savingFile: boolean
  pagination: StudentPagination
}

interface StudentPagination {
  total: number
}

const initialState: StudentState = {
  fetchingStudent: false,
  savingFile: false,
  students: [],
  pagination: { total: 0 },
}

export const saveStudentsExcelFile = createAsyncThunk(
  'students/saveExcelFile',
  async (file: FormData) => {
    const savedFile = await studentsApi.saveStudentsExcelFile(file)
    return savedFile
  }
)

export const getStudents = createAsyncThunk(
  'students/getStudents',
  async ({ offset, academicYear }: { offset: number; academicYear: number }) => {
    const students = await studentsApi.getAllStudents(offset, academicYear)
    return students
  }
)

export const getStudentsByFilter = createAsyncThunk(
  'students/getStudentsByFilter',
  async ({
    offset,
    status,
    fullName,
    term,
    academicYear,
    nameTeacher,
  }: {
    offset: number
    status: string
    fullName: string
    term: string
    academicYear: number
    nameTeacher: string
  }) => {
    const students = await studentsApi.filterByCondition(
      offset,
      status,
      fullName,
      term,
      academicYear,
      nameTeacher
    )
    return students
  }
)

export const editInfoStudent = createAsyncThunk(
  'students/editInfoStudent',
  async ({ id, data }: { id: string; data: EditStudentData }) => {
    const response = await studentsApi.editInfoStudent(id, data)
    return response
  }
)

export const addNewStudent = createAsyncThunk(
  'students/addNewStudent',
  async (data: StudentModel[]) => {
    const response = await studentsApi.addNewStudent(data)
    return response
  }
)

export const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Save excel file
    builder.addCase(saveStudentsExcelFile.pending, (state, action) => {
      state.savingFile = false
    })
    builder.addCase(saveStudentsExcelFile.fulfilled, (state, action) => {
      state.savingFile = true
    })
    builder.addCase(saveStudentsExcelFile.rejected, (state, action) => {
      state.savingFile = false
    })

    // Get all students
    builder.addCase(getStudents.pending, (state, action) => {
      state.fetchingStudent = true
      state.students = []
    })
    builder.addCase(getStudents.fulfilled, (state, action) => {
      state.fetchingStudent = false
      state.students = action.payload.data
      state.pagination.total = action.payload.pagination.total
    })
    builder.addCase(getStudents.rejected, (state, action) => {
      state.fetchingStudent = false
      state.students = []
    })

    // Get students by filter
    builder.addCase(getStudentsByFilter.pending, (state, action) => {
      state.fetchingStudent = true
      state.students = []
    })
    builder.addCase(getStudentsByFilter.fulfilled, (state, action) => {
      state.fetchingStudent = false
      state.students = action.payload.data
      state.pagination.total = action.payload.pagination.total
    })
    builder.addCase(getStudentsByFilter.rejected, (state, action) => {
      state.fetchingStudent = false
      state.students = []
    })

    // Add student
    builder.addCase(addNewStudent.pending, (state, action) => {
      state.fetchingStudent = true
    })
    builder.addCase(addNewStudent.fulfilled, (state, action) => {
      state.fetchingStudent = false
      state.students = [...state.students, action.payload]
    })
    builder.addCase(addNewStudent.rejected, (state, action) => {
      state.fetchingStudent = false
    })

    // Edit students
    builder.addCase(editInfoStudent.pending, (state, action) => {
      state.fetchingStudent = true
    })
    builder.addCase(editInfoStudent.fulfilled, (state, action) => {
      let currentStudent = state.students.findIndex((student) => student.id === action.payload.id)
      state.fetchingStudent = false
      state.students[currentStudent] = action.payload
    })
    builder.addCase(editInfoStudent.rejected, (state, action) => {
      state.fetchingStudent = false
    })
  },
})

export default studentSlice.reducer
