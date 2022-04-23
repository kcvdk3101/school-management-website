import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { StudentModel } from '../../models/student.model'

interface StudentState {
  students: StudentModel[]
}

const initialState: StudentState = {
  students: [],
}

export const getStudents = createAsyncThunk('students/getStudents', async () => {})

export const saveStudentsExcelFile = createAsyncThunk(
  'students/saveExcelFile',
  async (file: FormData) => {}
)

export const editInfoStudent = createAsyncThunk(
  'students/editInfoStudent',
  async ({ id, value }: { id: number; value: string | number }) => {}
)

export const deleteStudent = createAsyncThunk('students/deleteStudent', async (id: number) => {})

export const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
})

export const {} = studentSlice.actions
export default studentSlice.reducer
