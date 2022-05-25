import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from '../features/authenticate/authSlice'
import studentsReducer from '../features/student/studentsSlice'
import lecturersReducer from '../features/lecturer/lecturerSlice'
import jobReducer from '../features/job/jobSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    jobs: jobReducer,
    lecturers: lecturersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
