import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import studentsApi, { EditStudentData } from '../../api/studentsApi'
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

export const getStudents = createAsyncThunk('students/getStudents', async () => {
  const students = await studentsApi.getAllStudents()
  return students
})

export const editInfoStudent = createAsyncThunk(
  'students/editInfoStudent',
  async ({ id, data }: { id: string; data: EditStudentData }) => {
    const response = await studentsApi.editInfoStudent(id, data)
    console.log(response)
    return response
  }
)

// export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id: number) => {})

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
      state.fetchingStudent = false
      state.students = []
    })
    builder.addCase(getStudents.fulfilled, (state, action) => {
      state.fetchingStudent = true
      state.students = action.payload.data
      state.pagination.total = action.payload.pagination.total
    })
    builder.addCase(getStudents.rejected, (state, action) => {
      state.fetchingStudent = false
      state.students = []
    })

    // Edit students
    builder.addCase(editInfoStudent.pending, (state, action) => {
      state.fetchingStudent = true
    })
    builder.addCase(editInfoStudent.fulfilled, (state, action) => {
      let currentStudent = state.students.findIndex((student) => student.id === action.payload.id)
      console.log(currentStudent)
      state.fetchingStudent = false
      state.students[currentStudent] = action.payload
    })
    builder.addCase(editInfoStudent.rejected, (state, action) => {
      state.fetchingStudent = false
    })
  },
})

export const {} = studentSlice.actions
export default studentSlice.reducer
