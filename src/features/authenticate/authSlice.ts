import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import studentsApi from '../../api/university/studentsApi'
import userApi from '../../api/user/userApi'
import { UserModel } from '../../models/user.model'

interface AuthState {
  user: Partial<UserModel>
  error: string
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: {},
  error: '',
  isAuthenticated: false,
}

export const signin = createAsyncThunk(
  'auth/signin',
  async ({ email, password }: { email: string; password: string }) => {
    const response = await userApi.signin(email, password)
    return response
  }
)

export const signout = createAsyncThunk('auth/signout', async () => {
  const response = await userApi.signout()
  return response
})

export const authenticate = createAsyncThunk('auth/authenticate', async () => {
  const authenticate = await userApi.authenticate()
  return authenticate
})

export const acceptedStudent = createAsyncThunk(
  'auth/acceptedStudentRegistration',
  async (teacher: { studentId: string; teacherId: string }[]) => {
    const response = await studentsApi.acceptedStudentRegistration(teacher)
    return response
  }
)

export const rejectedStudent = createAsyncThunk(
  'auth/rejectedStudentRegistration',
  async (teacher: { studentId: string; teacherId: string }[]) => {
    const response = await studentsApi.rejectedStudentRegistration(teacher)
    return response
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // signin
    builder.addCase(signin.pending, (state, action) => {
      state.isAuthenticated = false
    })
    builder.addCase(signin.fulfilled, (state, action: PayloadAction<{ user: UserModel }>) => {
      state.isAuthenticated = true
      localStorage.setItem('userId', action.payload.user.id)
      state.user = action.payload.user
    })
    builder.addCase(signin.rejected, (state, action) => {
      state.isAuthenticated = false
      state.error = action.error.message as string
    })

    // signout
    builder.addCase(signout.pending, (state, action) => {
      state.isAuthenticated = true
    })
    builder.addCase(signout.fulfilled, (state, action) => {
      state.isAuthenticated = false
      localStorage.removeItem('userId')
      state.user = {}
    })
    builder.addCase(signout.rejected, (state, action) => {
      state.isAuthenticated = true
    })

    // authenticate with token
    builder.addCase(authenticate.pending, (state, action) => {
      state.isAuthenticated = false
    })
    builder.addCase(authenticate.fulfilled, (state, action) => {
      state.user = action.payload.user
      state.isAuthenticated = true
    })
    builder.addCase(authenticate.rejected, (state, action) => {
      state.isAuthenticated = false
    })

    // accepted student (role teacher)
    builder.addCase(acceptedStudent.fulfilled, (state, action) => {
      if (state.user.detail !== undefined) {
        state.user.detail.student = action.payload.student
        state.user.detail.studentWaitingAccepted = action.payload.studentWaitingAccepted
      }
    })

    // rejected student (role teacher)
    builder.addCase(rejectedStudent.fulfilled, (state, action) => {
      if (state.user.detail !== undefined) {
        state.user.detail.student = action.payload.student
        state.user.detail.studentWaitingAccepted = action.payload.studentWaitingAccepted
      }
    })
  },
})

export default authSlice.reducer
