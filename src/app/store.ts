import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from '../features/authenticate/authSlice'
import studentsReducer from '../features/student/studentsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    students: studentsReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
