import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userApi from '../../api/user/userApi'

type Admin = {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  role: string
  id: string
}

interface AuthState {
  user: Partial<Admin>
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // signin
    builder.addCase(signin.pending, (state, action) => {
      state.isAuthenticated = false
    })
    builder.addCase(signin.fulfilled, (state, action) => {
      state.isAuthenticated = true
      localStorage.setItem('id', action.payload.user.id)

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
      state.user = {}
    })
    builder.addCase(signout.rejected, (state, action) => {
      state.isAuthenticated = true
    })
  },
})

export default authSlice.reducer
