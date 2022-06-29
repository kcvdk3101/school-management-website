import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from '../features/authenticate/authSlice'
import studentsReducer from '../features/student/studentsSlice'
import teachersReducer from '../features/teacher/teacherSlice'
import jobReducer from '../features/job/jobSlice'
import postsReducer from '../features/post/postSlice'
import corpsReducer from '../features/corporation/corporationSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
    jobs: jobReducer,
    teachers: teachersReducer,
    posts: postsReducer,
    corps: corpsReducer,
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
