import { createSlice } from '@reduxjs/toolkit'
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

export const lecturerSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {},
  extraReducers: {},
})
